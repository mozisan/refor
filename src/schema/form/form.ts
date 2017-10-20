import { identity } from '../../utils/function';
import { InputSchema, InputTypeOf } from '../input';

export type Formatter<TInputs extends Record<string, InputSchema>, TOutputs> = (inputs: InputTypeOf<TInputs>) => TOutputs;

export namespace FormSchemaOptions {
  export interface NonFormatting<TInputs extends Record<string, InputSchema>> {
    inputs: TInputs;
    outputs?: never;
  }

  export interface Formatting<TInputs extends Record<string, InputSchema>, TOutputs> {
    inputs: TInputs;
    outputs: Formatter<TInputs, TOutputs>;
  }
}

export type FormSchemaOptions<TInputs extends Record<string, InputSchema>, TOutputs> =
  | FormSchemaOptions.NonFormatting<TInputs>
  | FormSchemaOptions.Formatting<TInputs, TOutputs>;

export class FormSchema<TInputs extends Record<string, InputSchema>, TOutputs> {
  public readonly inputs: TInputs;
  public readonly format: Formatter<TInputs, TOutputs>;

  constructor(options: FormSchemaOptions.Formatting<TInputs, TOutputs>);
  constructor(options: FormSchemaOptions.NonFormatting<TInputs>);
  constructor({ inputs, outputs = identity }: FormSchemaOptions<TInputs, any>) {
    this.inputs = inputs;
    this.format = outputs;
  }
}
