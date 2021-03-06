import { shallow } from 'enzyme';
import * as React from 'react';
import { FormSchema, CheckboxInputSchema, FileInputSchema, TextInputSchema } from '../../schema';
import { FormHandler } from './form';

describe('FormHandler', () => {
  it('should call `options.onUpdate` when some of input changes', () => {
    const updateHook = jest.fn();

    const handler = new FormHandler({
      schema: new FormSchema({
        text: new TextInputSchema(),
        file: new FileInputSchema(),
      }),
      onUpdate: updateHook,
    });

    expect(updateHook).not.toBeCalled();

    expect(updateHook.mock.calls.length).toEqual(0);

    const textInput = shallow(<input type="text" onChange={handler.inputs.text.handleChange} />);
    textInput.simulate('change', {
      currentTarget: {
        value: 'foo',
      },
    });

    expect(updateHook).toBeCalledWith(
      { text: 'foo', file: undefined },
      { text: '', file: undefined },
    );

    updateHook.mockClear();

    const dummyFile = new File([], 'dummy.txt');

    const fileInput = shallow(<input type="file" onChange={handler.inputs.file.handleChange} />);
    fileInput.simulate('change', {
      currentTarget: {
        files: [dummyFile],
      },
    });

    expect(updateHook).toBeCalledWith(
      { text: 'foo', file: dummyFile },
      { text: 'foo', file: undefined },
    );
  });

  describe('#handleSubmit()', () => {
    it('should call Event#preventDefault()', () => {
      const preventDefaultMock = jest.fn();
      const handler = new FormHandler({
        schema: new FormSchema({}),
      });

      expect(preventDefaultMock).not.toBeCalled();

      const element = shallow(<form onSubmit={handler.handleSubmit} />);
      element.simulate('submit', {
        preventDefault: preventDefaultMock,
      });

      expect(preventDefaultMock).toBeCalled();
    });

    describe('when `options.shouldSubmit` is undefined', () => {
      it('should call `options.onSubmit` with submittion values', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.handleSubmit} />);
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
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
          shouldSubmit: () => true,
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.handleSubmit} />);
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
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
          shouldSubmit: () => false,
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.handleSubmit} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).not.toBeCalled();
      });
    });

    describe('when `options.buildOutputs` is undefined', () => {
      it('should call `options.onSubmit` with raw input values', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.handleSubmit} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).toBeCalledWith({
          text: 'foo',
          checkbox: false,
        });
      });
    });

    describe('when `options.buildOutputs` is set', () => {
      it('should call `options.onSubmit` with formatted values', () => {
        const submitHook = jest.fn();
        const handler = new FormHandler({
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
          buildOutputs: ({ text, checkbox }) => ({
            textValue: text.value,
            checkboxValue: checkbox.value,
          }),
          onSubmit: submitHook,
        });
        expect(submitHook).not.toBeCalled();

        const element = shallow(<form onSubmit={handler.handleSubmit} />);
        element.simulate('submit', {
          preventDefault: jest.fn(),
        });

        expect(submitHook).toBeCalledWith({
          textValue: 'foo',
          checkboxValue: false,
        });
      });
    });
  });

  describe('#submit()', () => {
    describe('when `options.shouldSubmit` is undefined', () => {
      it('should call `options.onSubmit` with submittion values', () => {
        const subimtHook = jest.fn();
        const handler = new FormHandler({
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
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
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
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
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
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
        schema: new FormSchema({
          text: new TextInputSchema({ initial: 'foo' }),
          checkbox: new CheckboxInputSchema({ initial: false }),
        }),
      });

      expect(handler.inputs.text.value).toEqual('foo');
      expect(handler.inputs.checkbox.value).toEqual(false);

      handler.updateMultipleInputs(({ text, checkbox }) => {
        text.updateTo('bar');
        checkbox.updateTo(true);
      });

      expect(handler.inputs.text.value).toEqual('bar');
      expect(handler.inputs.checkbox.value).toEqual(true);
    });

    describe('when some of input has changed', () => {
      it('should call `options.onUpdate` once', () => {
        const updateHook = jest.fn();
        const handler = new FormHandler({
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
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
          schema: new FormSchema({
            text: new TextInputSchema({ initial: 'foo' }),
            checkbox: new CheckboxInputSchema({ initial: false }),
          }),
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
