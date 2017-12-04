import { SchemaContract } from './abstract';

export interface FileInputSchemaOptions {
  initial?: File | string;
}

export class FileInputSchema implements SchemaContract<'file'> {
  public readonly type: 'file' = 'file';
  public readonly initialValue?: File | string;

  constructor(options: FileInputSchemaOptions = {}) {
    this.initialValue = options.initial;
  }
}
