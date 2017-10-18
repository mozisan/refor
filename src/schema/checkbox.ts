export interface CheckboxInputSchemaOptions {
  initial?: boolean;
}

export interface CheckboxInputSchema {
  type: 'checkbox';
  initialValue: boolean;
}

export namespace CheckboxInputSchema {
  export const build = ({ initial = false }: CheckboxInputSchemaOptions = {}): CheckboxInputSchema => ({
    type: 'checkbox',
    initialValue: initial
  });
}
