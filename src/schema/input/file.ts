import { SchemaContract } from './abstract';

export interface FileInputSchemaOptions {
  initial?: File;
}

export class FileInputSchema implements SchemaContract<'file'> {
  public readonly type: 'file' = 'file';
  public readonly initialValue?: File;

  constructor(options: FileInputSchemaOptions = {}) {
    this.initialValue = options.initial;
  }
}
