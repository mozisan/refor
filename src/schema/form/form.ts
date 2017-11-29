import { InputSchema } from '../input';

export class FormSchema<TInputs extends Record<string, InputSchema>> {
  public readonly inputs: TInputs;

  constructor(inputs: TInputs) {
    this.inputs = inputs;
  }
}
