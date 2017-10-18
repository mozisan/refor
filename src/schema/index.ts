import { CheckboxInputSchema } from './checkbox';
import { FileInputSchema } from './file';
import { TextInputSchema } from './text';

export { CheckboxInputSchema } from './checkbox';
export { FileInputSchema } from './file';
export { TextInputSchema } from './text';

export type InputSchema =
  | CheckboxInputSchema
  | FileInputSchema
  | TextInputSchema;
