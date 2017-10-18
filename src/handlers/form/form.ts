import * as React from 'react';
import { InputSchema } from '../../schema';
import { keysOf, valuesOf, merge } from '../../wrappers/object';
import { InputHandlerMap, createInputHandlerMap } from '../input';

export interface  InputValueMapForHandlerType {
  checkbox: boolean;
  file: File | undefined;
  text: string;
}

export type InputValueMap<TFormSchema extends Record<string, InputSchema>> = {
  [TKey in keyof InputHandlerMap<TFormSchema>]: InputValueMapForHandlerType[InputHandlerMap<TFormSchema>[TKey]['type']];
};

export interface ConstructorOptions<TFormSchema extends Record<string, InputSchema>> {
  schema: TFormSchema;
  onUpdate?(): void;
  shouldSubmit?(payload: InputValueMap<TFormSchema>): boolean;
  onSubmit?(payload: InputValueMap<TFormSchema>): void;
}

export class FormHandler<TSchema extends Record<string, InputSchema>> {
  public readonly inputs: InputHandlerMap<TSchema>;
  private isInTransaction = false;
  private hasChangedInTransaction = false;
  private onUpdate?: () => void;
  private shouldSubmit?: (payload: InputValueMap<TSchema>) => boolean;
  private onSubmit?: (payload: InputValueMap<TSchema>) => void;

  constructor({
    schema,
    onUpdate,
    shouldSubmit,
    onSubmit,
  }: ConstructorOptions<TSchema>) {
    this.inputs = createInputHandlerMap(schema);
    this.onUpdate = onUpdate;
    this.shouldSubmit = shouldSubmit;
    this.onSubmit = onSubmit;

    valuesOf(this.inputs).map(inputHandler => inputHandler.onUpdate(this.handleInputUpdate));
  }

  public takeSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.submit();
  }

  public submit(): void {
    if (this.onSubmit == null) {
      return;
    }

    const payload = keysOf(this.inputs)
      .map(key => ({ [key]: this.inputs[key].submittingValue }))
      .reduce(merge, {}) as any;

    if (this.shouldSubmit != null && !this.shouldSubmit(payload)) {
      return;
    }

    this.onSubmit(payload);
  }

  public updateMultipleInputs(f: (inputs: InputHandlerMap<TSchema>) => void): void {
    this.isInTransaction = true;

    f(this.inputs);

    if (this.hasChangedInTransaction) {
      if (this.onUpdate != null) {
        this.onUpdate();
      }
      this.hasChangedInTransaction = false;
    }

    this.isInTransaction = false;
  }

  private handleInputUpdate = (): void => {
    if (this.isInTransaction) {
      this.hasChangedInTransaction = true;

      return;
    }

    if (this.onUpdate != null) {
      this.onUpdate();
    }
  }
}
