import { valuesOf } from './object';

describe('valuesOf()', () => {
  it('should extract values of passed object', () => {
    // tslint:disable no-magic-numbers
    const values = valuesOf({
      text: 'foo',
      number: 1,
      boolean: true,
      array: [1, 2, 3],
      object: { key: 'value' },
    });

    expect(values).toEqual([
      'foo',
      1,
      true,
      [1, 2, 3],
      { key: 'value' },
    ]);
    // tslint:enable
  });
});
