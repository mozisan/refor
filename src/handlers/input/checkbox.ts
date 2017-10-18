import { CheckboxInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';

export class CheckboxInputHandler {
  public readonly type: 'checkbox';
  public readonly key: string;
  private value: boolean;
  private updateHook?: () => void;

  constructor(key: string, { initialValue }: CheckboxInputSchema) {
    this.type = 'checkbox';
    this.key = appendRandomHash(key);
    this.value = initialValue;
  }

  public get isChecked(): boolean {
    return this.value;
  }

  public get submittingValue(): boolean {
    return this.isChecked;
  }

  public updateTo = (value: boolean): void => {
    this.value = value;
  }

  public toggle = () => {
    this.updateTo(!this.value);

    if (this.updateHook != null) {
      this.updateHook();
    }
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }
}
