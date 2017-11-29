import { FormEvent } from 'react';
import { FileInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export class FileInputHandler implements InputControllerContract<'file', File | undefined> {
  public readonly type: 'file';
  public key: string;
  private originalKey: string;
  private initialValue?: File;
  private selectedFile?: File;
  private updateHook?: () => void;

  constructor(key: string, { initialValue }: FileInputSchema) {
    this.type = 'file';
    this.key = appendRandomHash(key);
    this.originalKey = key;
    this.initialValue = initialValue;
    this.selectedFile = initialValue;
  }

  public get value(): File | undefined {
    return this.selectedFile;
  }

  public get isDirty(): boolean {
    return this.selectedFile !== this.initialValue;
  }

  public handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files == null || files.length === 0) {
      return;
    }

    this.updateTo(files[0]);
  }

  public updateTo(file?: File): this {
    if (this.selectedFile === file) {
      return this;
    }

    this.selectedFile = file;
    this.key = appendRandomHash(this.originalKey);

    if (this.updateHook != null) {
      this.updateHook();
    }

    return this;
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }

  public clear = () => this.updateTo(undefined);
}
