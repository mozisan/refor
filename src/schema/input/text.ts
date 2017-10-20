import { SchemaContract } from './abstract';

export interface TextInputSchemaOptions {
  initial?: string;
}

export class TextInputSchema implements SchemaContract<'text'> {
  public readonly type: 'text' = 'text';
  public readonly initialValue: string;

  constructor(options: TextInputSchemaOptions = {}) {
    this.initialValue = options.initial || '';
  }
}
