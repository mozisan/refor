import { FormEvent } from 'react';
import { MultiselectInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';

export class MultiselectInputHandler {
  public readonly type: 'multiselect';
  public readonly key: string;
  private valueSet: string[];
  private updateHook?: () => void;

  constructor(key: string, schema: MultiselectInputSchema) {
    this.type = 'multiselect';
    this.key = appendRandomHash(key);
    this.valueSet = schema.initialValues;
  }

  public get values(): string[] {
    return this.valueSet;
  }

  public get submittingValue(): string[] {
    return this.valueSet;
  }

  public takeChangeEvent = (e: FormEvent<HTMLSelectElement>) => {
    const optionNodes = e.currentTarget.getElementsByTagName('option');
    const options: HTMLOptionElement[] = [].slice.call(optionNodes);
    const valueSet = options.filter(option => option.selected).map(option => option.value);
    this.updateTo(valueSet);
  }

  public updateTo(value: string[]): this {
    this.valueSet = value;

    if (this.updateHook != null) {
      this.updateHook();
    }

    return this;
  }

  public add(...items: string[]): this {
    const addableItems = items.filter(item => !this.hasSelected(item));
    if (addableItems.length === 0) {
      return this;
    }

    return this.updateTo([...this.valueSet, ...addableItems]);
  }

  public remove(...items: string[]): this {
    const removableItems = items.filter(item => this.hasSelected(item));
    if (removableItems.length === 0) {
      return this;
    }

    return this.updateTo(this.getValueSetExcluding(removableItems));
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }

  private hasSelected(item: string): boolean {
    return this.valueSet.indexOf(item) !== -1;
  }

  private getValueSetExcluding(items: string[]): string[] {
    return this.valueSet.filter(value => items.indexOf(value) === -1);
  }
}
