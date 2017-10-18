export interface MultiselectInputSchemaOptions {
  initial?: string[];
}

export interface MultiselectInputSchema {
  type: 'multiselect';
  initialValues: string[];
}

export namespace MultiselectInputSchema {
  export const build = (options: MultiselectInputSchemaOptions = {}): MultiselectInputSchema => ({
    type: 'multiselect',
    initialValues: options.initial || [],
  });
}
