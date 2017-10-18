export interface FileInputSchema {
  type: 'file';
}

export namespace FileInputSchema {
  export const build = (): FileInputSchema => ({
    type: 'file',
  });
}
