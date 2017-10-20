import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export class FileInputHandler implements InputControllerContract<'file', File | undefined> {
  public readonly type: 'file';
  public readonly key: string;
  private selectedFile?: File;
  private updateHook?: () => void;

  constructor(key: string) {
    this.type = 'file';
    this.key = appendRandomHash(key);
  }

  public get value(): File | undefined {
    return this.selectedFile;
  }

  public takeChangeEvent = (e: React.FormEvent<HTMLInputElement>) => {
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
