import { appendRandomHash } from '../../utils/string';

export class FileInputHandler {
  public readonly type: 'file';
  public readonly key: string;
  private value?: File;
  private updateHook?: () => void;

  constructor(key: string) {
    this.type = 'file';
    this.key = appendRandomHash(key);
  }

  public get file(): File | undefined {
    return this.value;
  }

  public get submittingValue(): File | undefined {
    return this.file;
  }

  public takeChangeEvent = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files == null || files.length === 0) {
      return;
    }

    this.updateTo(files[0]);
  }

  public updateTo = (file?: File): void => {
    if (this.value === file) {
      return;
    }

    this.value = file;

    if (this.updateHook != null) {
      this.updateHook();
    }
  }

  public onUpdate(hook: () => void): this {
    this.updateHook = hook;

    return this;
  }

  public clear = () => this.updateTo(undefined);
}
