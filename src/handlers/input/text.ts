import { FormEvent } from 'react';
import { TextInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

type TextInputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export class TextInputHandler implements InputControllerContract<'text', string> {
  public readonly type: 'text';
  public readonly key: string;
  private inputText: string;
  private updateHook?: () => void;

  constructor(key: string, { initialValue }: TextInputSchema) {
    this.type = 'text';
    this.key = appendRandomHash(key);
    this.inputText = initialValue;
  }

  public get value(): string {
    return this.inputText;
  }

  public handleChange = (e: FormEvent<TextInputElement>) => {
    this.updateTo(e.currentTarget.value);
  }

  public updateTo(value: string): this {
    if (this.inputText === value) {
      return this;
    }

    this.inputText = value;

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
