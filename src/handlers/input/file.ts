import { FormEvent } from 'react';
import { FileInputSchema } from '../../schema';
import { convertBlobToFile } from '../../utils/file';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export type ImageResolver = (url: string) => Promise<File>;

export interface Dependencies {
  readonly imageResolver?: ImageResolver;
}

const defaultImageResolver: ImageResolver = (url: string) =>
  fetch(url).then(data => data.blob()).then(convertBlobToFile(url));

export class FileInputHandler implements InputControllerContract<'file', File | undefined> {
  public readonly type: 'file';
  public key: string;
  private originalKey: string;
  private hasInitialValue: boolean;
  private hasChanged: boolean;
  private selectedFile?: File;
  private updateHook?: () => void;
  private resolveImage: ImageResolver;

  constructor(key: string, { initialValue }: FileInputSchema, { imageResolver = defaultImageResolver }: Dependencies = {}) {
    this.type = 'file';
    this.key = appendRandomHash(key);
    this.originalKey = key;
    this.hasInitialValue = initialValue != null;
    this.hasChanged = false;
    this.selectedFile = initialValue instanceof File ? initialValue : undefined;
    this.resolveImage = imageResolver;

    if (typeof initialValue === 'string') {
      this.retrieveSelectedFileFromURL(initialValue);
    }
  }

  public get value(): File | undefined {
    return this.selectedFile;
  }

  public get isDirty(): boolean {
    return this.hasChanged;
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

    this.hasChanged = this.hasInitialValue ? true : file != null;
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

  private retrieveSelectedFileFromURL(url: string): void {
    this.resolveImage(url).then(file => {
      if (this.hasChanged) {
        return;
      }

      this.selectedFile = file;
      this.key = appendRandomHash(this.originalKey);

      if (this.updateHook != null) {
        this.updateHook();
      }
    });
  }
}
