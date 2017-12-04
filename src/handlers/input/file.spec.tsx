import { shallow } from 'enzyme';
import * as React from 'react';
import { FileInputSchema } from '../../schema';
import { FileInputHandler } from './file';

describe('FileInputHandler', () => {
  describe('#isDirty', () => {
    describe('with initial value of file', () => {
      it('should be correct value', () => {
        const schema = new FileInputSchema({ initial: new File([], '') });
        const handler = new FileInputHandler('key', schema);
        expect(handler.isDirty).toEqual(false);

        handler.updateTo(new File([], ''));
        expect(handler.isDirty).toEqual(true);

        handler.clear();
        expect(handler.isDirty).toEqual(true);
      });
    });

    describe('with initial value of url string', () => {
      it('should be correct value', () => {
        const schema = new FileInputSchema({ initial: '' });
        const handler = new FileInputHandler('key', schema, { imageResolver: async () => new File([], '') });
        expect(handler.isDirty).toEqual(false);

        handler.updateTo(new File([], ''));
        expect(handler.isDirty).toEqual(true);

        handler.clear();
        expect(handler.isDirty).toEqual(true);
      });
    });

    describe('without initial value', () => {
      it('should be correct value', () => {
        const schema = new FileInputSchema();
        const handler = new FileInputHandler('key', schema);
        expect(handler.isDirty).toEqual(false);

        handler.updateTo(new File([], ''));
        expect(handler.isDirty).toEqual(true);

        handler.clear();
        expect(handler.isDirty).toEqual(false);
      });
    });
  });

  describe('#handleChange()', () => {
    it('should update its value', () => {
      const schema = new FileInputSchema();
      const handler = new FileInputHandler('key', schema);
      expect(handler.value).toBeUndefined();

      const element = shallow(<input type="file" onChange={handler.handleChange} />);
      element.simulate('change', {
        currentTarget: {
          files: [new File([], '')],
        },
      });

      expect(handler.value).toBeInstanceOf(File);
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = new FileInputSchema();
      const handler = new FileInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="file" onChange={handler.handleChange} />);
      element.simulate('change', {
        currentTarget: {
          files: [new File([], '')],
        },
      });

      expect(hook).toBeCalled();
    });

    describe('when input value does not change at form event', () => {
      it('should not call the hook', () => {
        const hook = jest.fn();
        const schema = new FileInputSchema();
        const handler = new FileInputHandler('key', schema);
        const givenFile = new File([], '');
        const element = shallow(<input type="file" onChange={handler.handleChange} />);
        element.simulate('change', {
          currentTarget: {
            files: [givenFile],
          },
        });

        handler.onUpdate(hook);
        expect(hook).not.toBeCalled();

        element.simulate('change', {
          currentTarget: {
            files: [givenFile],
          },
        });

        expect(hook).not.toBeCalled();
      });
    });

    describe('when no file is given', () => {
      it('should not call the hook', () => {
        const hook = jest.fn();
        const schema = new FileInputSchema();
        const handler = new FileInputHandler('key', schema);
        handler.onUpdate(hook);
        expect(hook).not.toBeCalled();

        const emptyFileValues = [undefined, []];

        emptyFileValues.forEach(emptyFileValue => {
          const element = shallow(<input type="file" onChange={handler.handleChange} />);
          element.simulate('change', {
            currentTarget: {
              files: emptyFileValue,
            },
          });

          expect(hook).not.toBeCalled();
        });
      });
    });
  });

  describe('#updateTo()', () => {
    it('should updates its key', () => {
      const schema = new FileInputSchema();
      const handler = new FileInputHandler('key', schema);
      const prevKey = handler.key;
      handler.updateTo(new File([], ''));
      expect(handler.key).not.toEqual(prevKey);
    });
  });

  describe('#clear()', () => {
    it('should set undefined to its value', () => {
      const schema = new FileInputSchema();
      const handler = new FileInputHandler('key', schema);
      handler.updateTo(new File([], ''));
      expect(handler.value).toBeDefined();

      handler.clear();
      expect(handler.value).toBeUndefined();
    });

    it('should updates its key', () => {
      const schema = new FileInputSchema();
      const handler = new FileInputHandler('key', schema);
      handler.updateTo(new File([], ''));
      expect(handler.value).toBeDefined();

      const prevKey = handler.key;
      handler.clear();
      expect(handler.key).not.toEqual(prevKey);
    });
  });
});
