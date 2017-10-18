import { FormEvent } from 'react';
import { TextInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { FormattableString } from '../../values';

type TextInputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export class TextInputHandler {
  public readonly type: 'text';
  public readonly key: string;
  public readonly value: FormattableString;
  private updateHook?: () => void;

  constructor(key: string, schema: TextInputSchema) {
    this.type = 'text';
    this.key = appendRandomHash(key);
    this.value = new FormattableString(schema.initialValue, { formatBy: schema.formatter });
  }

  public get submittingValue(): string {
    return this.value.formatted;
  }

  public takeChangeEvent = (e: FormEvent<TextInputElement>) => {
    this.updateTo(e.currentTarget.value);
  }

  public updateTo(value: string): this {
    if (this.value.raw === value) {
      return this;
    }

    this.value.updateTo(value);

    if (this.updateHook != null) {
      this.updateHook();
    }

    return this;
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }
}
