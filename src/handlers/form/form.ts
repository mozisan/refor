import * as React from 'react';
import { FormSchema, InputSchema, InputTypeOf } from '../../schema';
import { keysOf, valuesOf, merge } from '../../wrappers/object';
import { InputHandlerMap, createInputHandlerMap } from '../input';

export interface ConstructorOptions<TInputs extends Record<string, InputSchema>, TOutputs> {
  schema: FormSchema<TInputs, TOutputs>;
  onUpdate?(): void;
  shouldSubmit?(outputs: TOutputs): boolean;
  onSubmit?(outputs: TOutputs): void;
}

export class FormHandler<TInputs extends Record<string, InputSchema>, TOutputs> {
  public readonly inputs: InputHandlerMap<TInputs>;
  private formatInputs: (inputs: InputTypeOf<TInputs>) => TOutputs;
  private formattedValues: TOutputs;
  private isInTransaction = false;
  private hasChangedInTransaction = false;
  private onUpdate?: (outputs: TOutputs) => void;
  private shouldSubmit?: (outputs: TOutputs) => boolean;
  private onSubmit?: (outputs: TOutputs) => void;

  constructor({
    schema,
    onUpdate,
    shouldSubmit,
    onSubmit,
  }: ConstructorOptions<TInputs, TOutputs>) {
    this.inputs = createInputHandlerMap(schema.inputs);
    this.formatInputs = schema.format;
    this.formattedValues = schema.format(this.buildInputValueMap(this.inputs));
    this.onUpdate = onUpdate;
    this.shouldSubmit = shouldSubmit;
    this.onSubmit = onSubmit;

    valuesOf(this.inputs).map(inputHandler => inputHandler.onUpdate(this.handleInputUpdate));
  }

  public get outputs(): TOutputs {
    return this.formattedValues;
  }

  public takeSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.submit();
  }

  public submit(): void {
    if (this.onSubmit == null) {
      return;
    }

    if (this.shouldSubmit != null && !this.shouldSubmit(this.formattedValues)) {
      return;
    }

    this.onSubmit(this.formattedValues);
  }

  public updateMultipleInputs(f: (inputs: InputHandlerMap<TInputs>) => void): void {
    this.isInTransaction = true;

    f(this.inputs);

    if (this.hasChangedInTransaction) {
      this.applyInputUpdate();
      this.hasChangedInTransaction = false;
    }

    this.isInTransaction = false;
  }

  private handleInputUpdate = (): void => {
    if (this.isInTransaction) {
      this.hasChangedInTransaction = true;

      return;
    }

    this.applyInputUpdate();
  }

  private applyInputUpdate(): void {
    this.formattedValues = this.formatInputs(this.buildInputValueMap(this.inputs));

    if (this.onUpdate != null) {
      this.onUpdate(this.formattedValues);
    }
  }

  private buildInputValueMap(inputs: InputHandlerMap<TInputs>): InputTypeOf<TInputs> {
    return keysOf(inputs)
      .map(key => ({ [key]: inputs[key].value }))
      .reduce(merge, {}) as any;
  }
}
