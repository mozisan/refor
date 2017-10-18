import { shallow } from 'enzyme';
import * as React from 'react';
import { TextInputSchema } from '../../schema';
import { TextInputHandler } from './text';

describe('TextInputHandler', () => {
  describe('#takeChangeEvent()', () => {
    it('should update its value', () => {
      const schema = TextInputSchema.build({ default: '' });
      const handler = new TextInputHandler('key', schema);
      expect(handler.value.raw).toEqual('');
      expect(handler.value.formatted).toEqual('');
      expect(handler.submittingValue).toEqual('');

      const element = shallow(<input type="text" onChange={handler.takeChangeEvent} />);
      element.simulate('change', {
        currentTarget: {
          value: 'foo',
        },
      });

      expect(handler.value.raw).toEqual('foo');
      expect(handler.value.formatted).toEqual('foo');
      expect(handler.submittingValue).toEqual('foo');
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = TextInputSchema.build({ default: '' });
      const handler = new TextInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="text" onChange={handler.takeChangeEvent} />);
      element.simulate('change', {
        currentTarget: {
          value: 'foo',
        },
      });

      expect(hook).toBeCalled();
    });

    describe('when input value does not change at form event', () => {
      it('should not call the hook', () => {
        const hook = jest.fn();
        const schema = TextInputSchema.build({ default: 'foo' });
        const handler = new TextInputHandler('key', schema);
        handler.onUpdate(hook);
        expect(hook).not.toBeCalled();

        const element = shallow(<input type="text" onChange={handler.takeChangeEvent} />);
        element.simulate('change', {
          currentTarget: {
            value: 'foo',
          },
        });

        expect(hook).not.toBeCalled();
      });
    });
  });
});
