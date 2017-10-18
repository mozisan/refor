import { identity } from '../utils/function';

export type Formatter = (value: string) => string;

export interface TextInputSchemaOptions {
  initial?: string;
  formatBy?: Formatter;
}

export interface TextInputSchema {
  type: 'text';
  initialValue: string;
  formatter: Formatter;
}

export namespace TextInputSchema {
  export const build = (options: TextInputSchemaOptions = {}): TextInputSchema => ({
    type: 'text',
    initialValue: options.initial || '',
    formatter: options.formatBy || identity,
  });
}
