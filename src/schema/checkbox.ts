export interface CheckboxInputSchemaOptions {
  default?: boolean;
}

export interface CheckboxInputSchema {
  type: 'checkbox';
  initialValue: boolean;
}

export namespace CheckboxInputSchema {
  export const build = ({ default: initialValue = false }: CheckboxInputSchemaOptions = {}): CheckboxInputSchema => ({
    initialValue,
    type: 'checkbox',
  });
}
