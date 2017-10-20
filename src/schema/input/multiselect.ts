import { SchemaContract } from './abstract';

export interface MultiselectInputSchemaOptions {
  initial?: string[];
}

export class MultiselectInputSchema implements SchemaContract<'multiselect'> {
  public readonly type: 'multiselect' = 'multiselect';
  public readonly initialValue: string[];

  constructor(options: MultiselectInputSchemaOptions = {}) {
    this.initialValue = options.initial || [];
  }
}
