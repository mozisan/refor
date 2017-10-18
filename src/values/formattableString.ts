import { identity } from '../utils/function';

export type Formatter = (value: string) => string;

export interface Options {
  formatBy?: Formatter;
}

export class FormattableString {
  private value: string;
  private format: Formatter;

  constructor(value: string, { formatBy = identity }: Options = {}) {
    this.value = value;
    this.format = formatBy;
  }

  public get formatted(): string {
    return this.format(this.value);
  }

  public get raw(): string {
    return this.value;
  }

  public updateTo(value: string): this {
    this.value = value;

    return this;
  }
}
