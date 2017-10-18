import { shallow } from 'enzyme';
import * as React from 'react';
import { CheckboxInputSchema } from '../../schema';
import { CheckboxInputHandler } from './checkbox';

describe('CheckboxInputHandler', () => {
  describe('#updateTo()', () => {
    it('should update its value', () => {
      const schema = CheckboxInputSchema.build({ default: false });
      const handler = new CheckboxInputHandler('key', schema);
      expect(handler.isChecked).toEqual(false);
      expect(handler.submittingValue).toEqual(false);

      handler.updateTo(true);
      expect(handler.isChecked).toEqual(true);
      expect(handler.submittingValue).toEqual(true);

      handler.updateTo(false);
      expect(handler.isChecked).toEqual(false);
      expect(handler.submittingValue).toEqual(false);
    });
  });

  describe('#toggle()', () => {
    it('should toggle its value', () => {
      const schema = CheckboxInputSchema.build({ default: false });
      const handler = new CheckboxInputHandler('key', schema);
      expect(handler.isChecked).toEqual(false);
      expect(handler.submittingValue).toEqual(false);

      handler.toggle();
      expect(handler.isChecked).toEqual(true);
      expect(handler.submittingValue).toEqual(true);

      handler.toggle();
      expect(handler.isChecked).toEqual(false);
      expect(handler.submittingValue).toEqual(false);
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = CheckboxInputSchema.build({ default: false });
      const handler = new CheckboxInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="text" onChange={handler.toggle} />);
      element.simulate('change');

      expect(hook).toBeCalled();
    });
  });
});
