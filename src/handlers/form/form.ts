import * as React from 'react';
import { FormSchema, InputSchema, InputTypeOf } from '../../schema';
import { valuesOf } from '../../utils/object';
import { keysOf, merge } from '../../wrappers/object';
import { InputHandlerMap, createInputHandlerMap } from '../input';

export interface ConstructorOptions<TInputs extends Record<string, InputSchema>, TOutputs> {
  schema: FormSchema<TInputs>;
  buildOutputs?(inputs: InputHandlerMap<TInputs>): TOutputs;
  onUpdate?(nextOutputs: TOutputs, prevOutputs: TOutputs): void;
  shouldSubmit?(outputs: TOutputs): boolean;
  onSubmit?(outputs: TOutputs): void;
}

export class FormHandler<TInputs extends Record<string, InputSchema>, TOutputs = InputTypeOf<TInputs>> {
  public readonly inputs: InputHandlerMap<TInputs>;
  private formattedValues: TOutputs;
  private isInTransaction = false;
  private hasChangedInTransaction = false;
  private buildOutputs?: (inputs: InputHandlerMap<TInputs>) => TOutputs;
  private onUpdate?: (nextOutputs: TOutputs, prevOutputs: TOutputs) => void;
  private shouldSubmit?: (outputs: TOutputs) => boolean;
  private onSubmit?: (outputs: TOutputs) => void;

  constructor({
    schema,
    buildOutputs,
    onUpdate,
    shouldSubmit,
    onSubmit,
  }: ConstructorOptions<TInputs, TOutputs>) {
    this.inputs = createInputHandlerMap(schema.inputs);
    this.buildOutputs = buildOutputs;
    this.formattedValues = this.formatInputs(this.inputs);
    this.onUpdate = onUpdate;
    this.shouldSubmit = shouldSubmit;
    this.onSubmit = onSubmit;

    valuesOf(this.inputs).map(inputHandler => inputHandler.onUpdate(this.handleInputUpdate));
  }

  public get outputs(): TOutputs {
    return this.formattedValues;
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  private formatInputs(inputs: InputHandlerMap<TInputs>): TOutputs {
    if (this.buildOutputs != null) {
      return this.buildOutputs(inputs);
    }

    return this.buildInputValueMap(this.inputs) as any;
  }

  private applyInputUpdate(): void {
    const prevFormattedValues = this.formattedValues;
    const nextFormattedValues = this.formatInputs(this.inputs);

    this.formattedValues = nextFormattedValues;

    if (this.onUpdate != null) {
      this.onUpdate(nextFormattedValues, prevFormattedValues);
    }
  }

  private buildInputValueMap = (inputs: InputHandlerMap<TInputs>): InputTypeOf<TInputs>  =>
    keysOf(inputs)
      .map(key => ({ [key]: inputs[key].value }))
      .reduce(merge, {}) as any
}
