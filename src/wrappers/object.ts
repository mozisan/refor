export const keysOf: <T extends object>(value: T) => (keyof T)[] = Object.keys as any;

export const merge = <A extends object, B extends object>(a: A, b: B): A & B => ({
  ...(a as any),
  ...(b as any),
});
