import { keysOf } from '../wrappers/object';

export const valuesOf = <T extends object>(value: T): (T[keyof T])[] => keysOf(value).map(key => value[key]);
