import { shallow } from 'enzyme';
import * as React from 'react';
import { TextInputSchema } from '../../schema';
import { TextInputHandler } from './text';

describe('TextInputHandler', () => {
  describe('#isDirty', () => {
    it('should be correct value', () => {
      const schema = new TextInputSchema({ initial: '' });
      const handler = new TextInputHandler('key', schema);
      expect(handler.isDirty).toEqual(false);

      handler.updateTo('hoge');
      expect(handler.isDirty).toEqual(true);

      handler.updateTo('');
      expect(handler.isDirty).toEqual(false);
    });
  });

  describe('#handleChange()', () => {
    it('should update its value', () => {
      const schema = new TextInputSchema({ initial: '' });
      const handler = new TextInputHandler('key', schema);
      expect(handler.value).toEqual('');

      const element = shallow(<input type="text" onChange={handler.handleChange} />);
      element.simulate('change', {
        currentTarget: {
          value: 'foo',
        },
      });

      expect(handler.value).toEqual('foo');
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = new TextInputSchema({ initial: '' });
      const handler = new TextInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="text" onChange={handler.handleChange} />);
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
        const schema = new TextInputSchema({ initial: 'foo' });
        const handler = new TextInputHandler('key', schema);
        handler.onUpdate(hook);
        expect(hook).not.toBeCalled();

        const element = shallow(<input type="text" onChange={handler.handleChange} />);
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
