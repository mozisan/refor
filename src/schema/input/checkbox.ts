import { SchemaContract } from './abstract';

export interface CheckboxInputSchemaOptions {
  initial?: boolean;
}

export class CheckboxInputSchema implements SchemaContract<'checkbox'> {
  public readonly type: 'checkbox' = 'checkbox';
  public readonly initialValue: boolean;

  constructor(options: CheckboxInputSchemaOptions = {}) {
    this.initialValue = options.initial || false;
  }
}
