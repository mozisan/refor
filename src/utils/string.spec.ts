import { times } from 'lodash';
import { appendRandomHash } from './string';

describe('appendRandomHash()', () => {
  it('should format the given string value', () => {
    const testCount = 10000;

    times(testCount, () => {
      expect(appendRandomHash('foo_bar_baz')).toMatch(/^foo_bar_baz#[a-z0-9]+$/);
    });
  });
});
