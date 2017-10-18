import { CheckboxInputSchema } from './checkbox';
import { FileInputSchema } from './file';
import { MultiselectInputSchema } from './multiselect';
import { TextInputSchema } from './text';

export { CheckboxInputSchema } from './checkbox';
export { FileInputSchema } from './file';
export { MultiselectInputSchema } from './multiselect';
export { TextInputSchema } from './text';

export type InputSchema =
  | CheckboxInputSchema
  | FileInputSchema
  | MultiselectInputSchema
  | TextInputSchema;
