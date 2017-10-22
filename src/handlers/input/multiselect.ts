import { FormEvent } from 'react';
import { MultiselectInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export class MultiselectInputHandler implements InputControllerContract<'multiselect', string[]> {
  public readonly type: 'multiselect';
  public readonly key: string;
  private selectedValues: string[];
  private updateHook?: () => void;

  constructor(key: string, schema: MultiselectInputSchema) {
    this.type = 'multiselect';
    this.key = appendRandomHash(key);
    this.selectedValues = schema.initialValue;
  }

  public get value(): string[] {
    return this.selectedValues;
  }

  public handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const optionNodes = e.currentTarget.getElementsByTagName('option');
    const options: HTMLOptionElement[] = [].slice.call(optionNodes);
    const selectedValues = options.filter(option => option.selected).map(option => option.value);
    this.updateTo(selectedValues);
  }

  public updateTo(value: string[]): this {
    this.selectedValues = value;

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

    return this.updateTo([...this.selectedValues, ...addableItems]);
  }

  public remove(...items: string[]): this {
    const removableItems = items.filter(item => this.hasSelected(item));
    if (removableItems.length === 0) {
      return this;
    }

    return this.updateTo(this.getselectedValuesExcluding(removableItems));
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }

  private hasSelected(item: string): boolean {
    return this.selectedValues.indexOf(item) !== -1;
  }

  private getselectedValuesExcluding(items: string[]): string[] {
    return this.selectedValues.filter(value => items.indexOf(value) === -1);
  }
}
