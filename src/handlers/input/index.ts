import { InputSchema } from '../../schema';
import { keysOf, merge } from '../../wrappers/object';
import { CheckboxInputHandler } from './checkbox';
import { FileInputHandler } from './file';
import { TextInputHandler } from './text';

export interface InputHandlerMapForInputSchemaType {
  checkbox: CheckboxInputHandler;
  file: FileInputHandler;
  text: TextInputHandler;
}

function createInputHandler<TFormSchema extends Record<string, InputSchema>>(
  formSchema: TFormSchema,
  inputKey: keyof TFormSchema,
): InputHandlerMapForInputSchemaType[TFormSchema[typeof inputKey]['type']] {
  const inputSchema: InputSchema = formSchema[inputKey];

  switch (inputSchema.type) {
  case 'checkbox':
    return new CheckboxInputHandler(inputKey, inputSchema);
  case 'file':
    return new FileInputHandler(inputKey);
  case 'text':
    return new TextInputHandler(inputKey, inputSchema);
  }
}

export type InputHandlerMap<TFormSchema extends Record<string, InputSchema>> = {
  [TInputKey in keyof TFormSchema]: InputHandlerMapForInputSchemaType[TFormSchema[TInputKey]['type']];
};

export function createInputHandlerMap<TFormSchema extends Record<string, InputSchema>>(
  schema: TFormSchema,
): InputHandlerMap<TFormSchema> {
  return keysOf(schema)
    .map(key => ({ [key]: createInputHandler(schema, key) }))
    .reduce(merge, {}) as any;
}
