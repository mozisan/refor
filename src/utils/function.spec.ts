import { identity } from './function';

describe('identity()', () => {
  it('should return the passed value', () => {
    const values = [
      0,
      1,
      true,
      false,
      '',
      'foo',
      [],
      {},
      () => undefined,
    ];

    values.forEach(value => {
      expect(identity(value)).toBe(value);
    });
  });
});
