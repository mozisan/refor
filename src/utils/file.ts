import * as mime from 'mime';

export const convertBlobToFile = (url: string) => (blob: Blob) => {
  const mimeType = mime.getType(url);
  const extension = mimeType && mime.getExtension(mimeType);
  const filename = extension ? `uploaded.${extension}` : '';

  return new File([blob], filename, { type: mimeType || undefined });
};
