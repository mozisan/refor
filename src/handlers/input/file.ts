import { FormEvent } from 'react';
import { FileInputSchema } from '../../schema';
import { appendRandomHash } from '../../utils/string';
import { InputControllerContract } from './abstract';

export type ImageResolver = (url: string) => Promise<File>;

export interface Dependencies {
  readonly imageResolver?: ImageResolver;
}

const defaultImageResolver: ImageResolver = (url: string) =>
  fetch(url)
    .then(data => data.blob())
    .then(blob => new File([blob], `uploaded.${url.split('.').pop()}`));

export class FileInputHandler implements InputControllerContract<'file', File | undefined> {
  public readonly type: 'file';
  public key: string;
  private originalKey: string;
  private initialSet: boolean;
  private hasChanged: boolean;
  private selectedFile?: File;
  private updateHook?: () => void;
  private resolveImage: ImageResolver;

  constructor(key: string, { initialValue }: FileInputSchema, { imageResolver = defaultImageResolver }: Dependencies = {}) {
    this.type = 'file';
    this.key = appendRandomHash(key);
    this.originalKey = key;
    this.initialSet = initialValue != null;
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

    this.selectedFile = file;
    this.key = appendRandomHash(this.originalKey);

    this.hasChanged = this.initialSet ? true : this.selectedFile != null;

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
    this.resolveImage(url).then(file => this.updateTo(file));
  }
}
