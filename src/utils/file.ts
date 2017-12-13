import * as mime from 'mime';

interface FileLikeAttributes {
  name: string;
  lastModifiedDate: Date;
}

export const convertBlobToFile = (url: string) => (sourceBlob: Blob): File => {
  const mimeType = mime.getType(url);
  const extension = mimeType && mime.getExtension(mimeType);
  const filename = extension ? `uploaded.${extension}` : '';

  const blob = new Blob([sourceBlob], { type: mimeType || undefined });
  const file: Blob & FileLikeAttributes = blob as any;
  file.name = filename;
  file.lastModifiedDate = new Date();

  return file as any;
};
