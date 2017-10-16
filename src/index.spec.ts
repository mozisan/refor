import { empty } from '.';

describe('empty', () => {
  it('should be a string', () => {
    expect(empty).toEqual(expect.any(String));
  });
});
