export interface CheckboxInputSchemaOptions {
  initial?: boolean;
}

export interface CheckboxInputSchema {
  type: 'checkbox';
  initialValue: boolean;
}

export namespace CheckboxInputSchema {
  export const build = (options: CheckboxInputSchemaOptions = {}): CheckboxInputSchema => ({
    type: 'checkbox',
    initialValue: options.initial || false,
  });
}
