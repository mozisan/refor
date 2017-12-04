import * as mime from 'mime';

export const convertBlobToFile = (url: string) => (blob: Blob) =>
  new File([blob], `uploaded.${mime.getExtension(url)}`, { type: mime.getType(url) || undefined });
