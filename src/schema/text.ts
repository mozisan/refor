import { identity } from '../utils/function';

export type Formatter = (value: string) => string;

export interface TextInputSchemaOptions {
  default?: string;
  formatBy?: Formatter;
}

export interface TextInputSchema {
  type: 'text';
  initialValue: string;
  formatter: Formatter;
}

export namespace TextInputSchema {
  export const build = ({ default: initialValue = '', formatBy = identity }: TextInputSchemaOptions = {}): TextInputSchema => ({
    initialValue,
    type: 'text',
    formatter: formatBy,
  });
}
