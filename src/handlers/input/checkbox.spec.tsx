import { shallow } from 'enzyme';
import * as React from 'react';
import { CheckboxInputSchema } from '../../schema';
import { CheckboxInputHandler } from './checkbox';

describe('CheckboxInputHandler', () => {
  describe('#isDirty', () => {
    it('should be correct value', () => {
      const schema = new CheckboxInputSchema({ initial: false });
      const handler = new CheckboxInputHandler('key', schema);
      expect(handler.isDirty).toEqual(false);

      handler.toggle();
      expect(handler.isDirty).toEqual(true);

      handler.toggle();
      expect(handler.isDirty).toEqual(false);
    });
  });

  describe('#updateTo()', () => {
    it('should update its value', () => {
      const schema = new CheckboxInputSchema({ initial: false });
      const handler = new CheckboxInputHandler('key', schema);
      expect(handler.value).toEqual(false);

      handler.updateTo(true);
      expect(handler.value).toEqual(true);

      handler.updateTo(false);
      expect(handler.value).toEqual(false);
    });
  });

  describe('#toggle()', () => {
    it('should toggle its value', () => {
      const schema = new CheckboxInputSchema({ initial: false });
      const handler = new CheckboxInputHandler('key', schema);
      expect(handler.value).toEqual(false);

      handler.toggle();
      expect(handler.value).toEqual(true);

      handler.toggle();
      expect(handler.value).toEqual(false);
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = new CheckboxInputSchema({ initial: false });
      const handler = new CheckboxInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="text" onChange={handler.toggle} />);
      element.simulate('change');

      expect(hook).toBeCalled();
    });
  });
});
