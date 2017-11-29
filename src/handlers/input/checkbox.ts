import { CheckboxInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export class CheckboxInputHandler implements InputControllerContract<'checkbox', boolean> {
  public readonly type: 'checkbox';
  public readonly key: string;
  private initialValue: boolean;
  private isChecked: boolean;
  private updateHook?: () => void;

  constructor(key: string, { initialValue }: CheckboxInputSchema) {
    this.key = appendRandomHash(key);
    this.initialValue = initialValue;
    this.isChecked = initialValue;
  }

  public get value(): boolean {
    return this.isChecked;
  }

  public get isDirty(): boolean {
    return this.isChecked !== this.initialValue;
  }

  public toggle = () => {
    this.updateTo(!this.isChecked);

    if (this.updateHook != null) {
      this.updateHook();
    }
  }

  public updateTo(value: boolean): this {
    this.isChecked = value;

    return this;
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }
}
