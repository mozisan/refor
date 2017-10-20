import { identity } from '../../utils/function';
import { InputSchema, InputTypeOf } from '../input';

export type Formatter<TInputs extends Record<string, InputSchema>, TOutputs> = (inputs: InputTypeOf<TInputs>) => TOutputs;

export interface FormSchema<TInputs extends Record<string, InputSchema>, TOutputs> {
  readonly inputs: TInputs;
  readonly format: Formatter<TInputs, TOutputs>;
}

export namespace Options {
  export interface NonFormatting<TInputs extends Record<string, InputSchema>> {
    inputs: TInputs;
    outputs?: never;
  }

  export interface Formatting<TInputs extends Record<string, InputSchema>, TOutputs> {
    inputs: TInputs;
    outputs: Formatter<TInputs, TOutputs>;
  }
}

export type Options<TInputs extends Record<string, InputSchema>, TOutputs> =
  | Options.NonFormatting<TInputs>
  | Options.Formatting<TInputs, TOutputs>;

export interface FormSchemaClass {
  new <TInputs extends Record<string, InputSchema>, TOutputs>(
    options: Options.Formatting<TInputs, TOutputs>,
  ): FormSchema<TInputs, TOutputs>;
  new <TInputs extends Record<string, InputSchema>>(
    options: Options.NonFormatting<TInputs>,
  ): FormSchema<TInputs, InputTypeOf<TInputs>>;
}

// tslint:disable-next-line max-line-length
export const FormSchema: FormSchemaClass = class <TInputs extends Record<string, InputSchema>, TOutputs> implements FormSchema<TInputs, TOutputs> {
  public readonly inputs: TInputs;
  public readonly format: Formatter<TInputs, TOutputs>;

  constructor(options: Options.Formatting<TInputs, TOutputs>);
  constructor(options: Options.NonFormatting<TInputs>);
  constructor({ inputs, outputs = identity }: Options<any, any>) {
    this.inputs = inputs;
    this.format = outputs;
  }
};
