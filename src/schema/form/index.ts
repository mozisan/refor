import { InputSchema, InputTypeOf } from '../input';
import { FormSchema as _FormSchema, FormSchemaOptions } from './form';

export interface FormSchemaClass {
  new <TInputs extends Record<string, InputSchema>, TOutputs>(
    options: FormSchemaOptions.Formatting<TInputs, TOutputs>,
  ): _FormSchema<TInputs, TOutputs>;
  new <TInputs extends Record<string, InputSchema>>(
    options: FormSchemaOptions.NonFormatting<TInputs>,
  ): _FormSchema<TInputs, InputTypeOf<TInputs>>;
}

export type FormSchema<TInputs extends Record<string, InputSchema>, TOutputs> = _FormSchema<TInputs, TOutputs>;
export const FormSchema: FormSchemaClass = _FormSchema;
