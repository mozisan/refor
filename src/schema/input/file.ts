import { SchemaContract } from './abstract';

export class FileInputSchema implements SchemaContract<'file'> {
  public readonly type: 'file' = 'file';
}
