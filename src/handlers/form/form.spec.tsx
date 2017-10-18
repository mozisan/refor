import { shallow } from 'enzyme';
import * as React from 'react';
import { CheckboxInputSchema, FileInputSchema, TextInputSchema } from '../../schema';
import { FormHandler } from './form';

describe('FormHandler', () => {
  it('should call `options.onUpdate` when some of input changes', () => {
    const updateHook = jest.fn();

    const handler = new FormHandler({
      schema: {
        text: TextInputSchema.build(),
      },
      onUpdate: updateHook,
    });

    expect(updateHook).not.toBeCalled();

    expect(updateHook.mock.calls.length).toEqual(0);

    const element = shallow(<input type="text" onChange={handler.inputs.text.takeChangeEvent} />);
    element.simulate('change', {
      currentTarget: {
        value: 'foo',
      },
    });

    expect(updateHook).toBeCalled();
  });

  describe('#takeSubmitEvent()', () => {
    it('should call Event#preventDefault()', () => {
      const preventDefaultMock = jest.fn();
      const handler = new FormHandler({
        schema: {},
      });

      expect(preventDefaultMock).not.toBeCalled();

      const element = shallow(<form onSubmit={handler.takeSubmitEvent} />);
      element.simulate('submit', {
        preventDefault: preventDefaultMock,
      });

      expect(preventDefaultMock).toBeCalled();
    });

    describe('when `options.shouldSubmit` is undefined', () => {
      it('should call `options.onSubmit` with submittion values', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.takeSubmitEvent} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).toBeCalledWith({
          text: 'foo',
          checkbox: false,
        });
      });
    });

    describe('when `options.shouldSubmit` returns true', () => {
      it('should call `options.onSubmit`', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          shouldSubmit: () => true,
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.takeSubmitEvent} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).toBeCalledWith({
          text: 'foo',
          checkbox: false,
        });
      });
    });

    describe('when `options.shouldSubmit` returns false', () => {
      it('should not call `options.onSubmit`', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          shouldSubmit: () => false,
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.takeSubmitEvent} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).not.toBeCalled();
      });
    });
  });

  describe('#submit()', () => {
    describe('when `options.shouldSubmit` is undefined', () => {
      it('should call `options.onSubmit` with submittion values', () => {
        const subimtHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          onSubmit: subimtHook,
        });

        expect(subimtHook).not.toBeCalled();

        handler.submit();

        expect(subimtHook).toBeCalledWith({
          text: 'foo',
          checkbox: false,
        });
      });
    });

    describe('when `options.shouldSubmit` returns true', () => {
      it('should call `options.onSubmit` with submittion values', () => {
        const subimtHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          shouldSubmit: () => true,
          onSubmit: subimtHook,
        });

        expect(subimtHook).not.toBeCalled();

        handler.submit();

        expect(subimtHook).toBeCalledWith({
          text: 'foo',
          checkbox: false,
        });
      });
    });

    describe('when `options.shouldSubmit` returns false', () => {
      it('should not call `options.onSubmit`', () => {
        const subimtHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          shouldSubmit: () => false,
          onSubmit: subimtHook,
        });

        expect(subimtHook).not.toBeCalled();

        handler.submit();

        expect(subimtHook).not.toBeCalled();
      });
    });
  });

  describe('#updateMultipleInputs()', () => {
    it('should update its values', () => {
      const handler = new FormHandler({
        schema: {
          text: TextInputSchema.build({ default: 'foo' }),
          checkbox: CheckboxInputSchema.build({ default: false }),
        },
      });

      expect(handler.inputs.text.value.raw).toEqual('foo');
      expect(handler.inputs.text.value.formatted).toEqual('foo');
      expect(handler.inputs.text.submittingValue).toEqual('foo');
      expect(handler.inputs.checkbox.isChecked).toEqual(false);
      expect(handler.inputs.checkbox.submittingValue).toEqual(false);

      handler.updateMultipleInputs(({ text, checkbox }) => {
        text.updateTo('bar');
        checkbox.updateTo(true);
      });

      expect(handler.inputs.text.value.raw).toEqual('bar');
      expect(handler.inputs.text.value.formatted).toEqual('bar');
      expect(handler.inputs.text.submittingValue).toEqual('bar');
      expect(handler.inputs.checkbox.isChecked).toEqual(true);
      expect(handler.inputs.checkbox.submittingValue).toEqual(true);
    });

    describe('when some of input has changed', () => {
      it('should call `options.onUpdate` once', () => {
        const updateHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          onUpdate: updateHook,
        });

        expect(updateHook).not.toBeCalled();

        handler.updateMultipleInputs(({ text, checkbox }) => {
          text.updateTo('bar');
          checkbox.updateTo(true);
        });

        expect(updateHook.mock.calls.length).toEqual(1);
      });
    });

    describe('when some of input has not changed', () => {
      it('should not call `options.onUpdate`', () => {
        const updateHook = jest.fn();
        const handler = new FormHandler({
          schema: {
            text: TextInputSchema.build({ default: 'foo' }),
            checkbox: CheckboxInputSchema.build({ default: false }),
          },
          onUpdate: updateHook,
        });

        expect(updateHook).not.toBeCalled();

        handler.updateMultipleInputs(({ text, checkbox }) => {
          text.updateTo('foo');
          checkbox.updateTo(false);
        });

        expect(updateHook).not.toBeCalled();
      });
    });
  });
});
