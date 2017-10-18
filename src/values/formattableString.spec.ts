import { FormattableString } from './formattableString';

describe('FormattableString', () => {
  describe('#formatted', () => {
    it('should return a string value', () => {
      const formattable = new FormattableString('');
      expect(formattable.formatted).toEqual(expect.any(String));
    });

    it('should be formatted as the option given to constructor as `formatBy`', () => {
      const formattable = new FormattableString('  foo  ', { formatBy: value => value.trim() });
      expect(formattable.raw).toEqual('  foo  ');
      expect(formattable.formatted).toEqual('foo');
    });
  });

  describe('#raw', () => {
    it('should return a string value', () => {
      const formattable = new FormattableString('');
      expect(formattable.raw).toEqual(expect.any(String));
    });
  });

  describe('#update()', () => {
    it('should update its raw value', () => {
      const formattable = new FormattableString('foo');
      expect(formattable.raw).toEqual('foo');

      formattable.updateTo('bar');
      expect(formattable.raw).toEqual('bar');
    });
  });
});
