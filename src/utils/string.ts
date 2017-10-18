// tslint:disable-next-line insecure-random no-magic-numbers
const generateRandomHash = () => Math.random().toString(36).slice(2);

export const appendRandomHash = (value: string) => `${value}#${generateRandomHash()}`;
