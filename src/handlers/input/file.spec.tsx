import { shallow } from 'enzyme';
import * as React from 'react';
import { FileInputHandler } from './file';

describe('FileInputHandler', () => {
  describe('#takeChangeEvent()', () => {
    it('should update its value', () => {
      const handler = new FileInputHandler('key');
      expect(handler.file).toBeUndefined();
      expect(handler.submittingValue).toBeUndefined();

      const element = shallow(<input type="file" onChange={handler.takeChangeEvent} />);
      element.simulate('change', {
        currentTarget: {
          files: [new File([], '')],
        },
      });

      expect(handler.file).toBeInstanceOf(File);
      expect(handler.submittingValue).toBeInstanceOf(File);
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const handler = new FileInputHandler('key');
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = shallow(<input type="file" onChange={handler.takeChangeEvent} />);
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
        const handler = new FileInputHandler('key');
        const givenFile = new File([], '');
        const element = shallow(<input type="file" onChange={handler.takeChangeEvent} />);
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
        const handler = new FileInputHandler('key');
        handler.onUpdate(hook);
        expect(hook).not.toBeCalled();

        const emptyFileValues = [undefined, []];

        emptyFileValues.forEach(emptyFileValue => {
          const element = shallow(<input type="file" onChange={handler.takeChangeEvent} />);
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

  describe('#clear()', () => {
    it('should set undefined to its value', () => {
      const handler = new FileInputHandler('key');
      const element = shallow(<input type="file" onChange={handler.takeChangeEvent} />);
      element.simulate('change', {
        currentTarget: {
          files: [new File([], '')],
        },
      });
      expect(handler.file).toBeDefined();

      handler.clear();
      expect(handler.file).toBeUndefined();
    });
  });
});