import { mount } from 'enzyme';
import * as React from 'react';
import { MultiselectInputSchema } from '../../schema';
import { MultiselectInputHandler } from './multiselect';

describe('MultiselectInputHandler', () => {
  describe('#takeChangeEvent()', () => {
    describe('when only one of options is selected', () => {
      it('should update its value', () => {
        const schema = new MultiselectInputSchema();
        const handler = new MultiselectInputHandler('key', schema);
        expect(handler.value).toEqual([]);

        const element = mount(
          <select multiple value={handler.value} onChange={handler.takeChangeEvent}>
            <option id="foo" value="foo">foo</option>
            <option id="bar" value="bar">bar</option>
          </select>
        );
        const fooOption = element.find('#foo').getDOMNode();
        fooOption.selected = true;
        element.simulate('change');

        expect(handler.value).toEqual(['foo']);
      });
    });

    describe('when more than one of options are selected', () => {
      it('should update its value', () => {
        const schema = new MultiselectInputSchema();
        const handler = new MultiselectInputHandler('key', schema);
        expect(handler.value).toEqual([]);

        const element = mount(
          <select multiple value={handler.value} onChange={handler.takeChangeEvent}>
            <option id="foo" value="foo">foo</option>
            <option id="bar" value="bar">bar</option>
          </select>
        );
        const fooOption = element.find('#foo').getDOMNode();
        fooOption.selected = true;
        const barOption = element.find('#bar').getDOMNode();
        barOption.selected = true;
        element.simulate('change');

        expect(handler.value).toEqual(['foo', 'bar']);
      });
    });

    describe('when some options are deselected', () => {
      it('should update its value', () => {
        const schema = new MultiselectInputSchema({ initial: ['foo', 'baz'] });
        const handler = new MultiselectInputHandler('key', schema);
        expect(handler.value).toEqual(['foo', 'baz']);

        const element = mount(
          <select multiple value={handler.value} onChange={handler.takeChangeEvent}>
            <option id="foo" value="foo">foo</option>
            <option id="bar" value="bar">bar</option>
            <option id="baz" value="baz">baz</option>
          </select>
        );
        const barOption = element.find('#bar').getDOMNode();
        barOption.selected = true;
        const bazOption = element.find('#baz').getDOMNode();
        bazOption.selected = false;
        element.simulate('change');

        expect(handler.value).toEqual(['foo', 'bar']);
      });
    });
  });

  describe('#add()', () => {
    it('should update its value', () => {
      const schema = new MultiselectInputSchema();
      const handler = new MultiselectInputHandler('key', schema);
      expect(handler.value).toEqual([]);

      // adding non existing item
      handler.add('foo');
      expect(handler.value).toEqual(['foo']);

      // adding existing item
      handler.add('foo');
      expect(handler.value).toEqual(['foo']);

      // adding existing item and non existing ones
      handler.add('foo', 'bar', 'baz');
      expect(handler.value).toEqual(['foo', 'bar', 'baz']);
    });
  });

  describe('#remove()', () => {
    it('should update its value', () => {
      const schema = new MultiselectInputSchema({ initial: ['foo', 'bar', 'baz'] });
      const handler = new MultiselectInputHandler('key', schema);
      expect(handler.value).toEqual(['foo', 'bar', 'baz']);

      // removing existing item
      handler.remove('foo');
      expect(handler.value).toEqual(['bar', 'baz']);

      // removing non existing item
      handler.remove('foo');
      expect(handler.value).toEqual(['bar', 'baz']);

      // removing non existing value and existing ones
      handler.remove('bar', 'hoge', 'fuga');
      expect(handler.value).toEqual(['baz']);
    });
  });

  describe('#onUpdate()', () => {
    it('should register a hook which will be called after update', () => {
      const hook = jest.fn();
      const schema = new MultiselectInputSchema();
      const handler = new MultiselectInputHandler('key', schema);
      handler.onUpdate(hook);
      expect(hook).not.toBeCalled();

      const element = mount(
        <select multiple value={handler.value} onChange={handler.takeChangeEvent}>
          <option id="foo" value="foo">foo</option>
          <option id="bar" value="bar">bar</option>
        </select>
      );
      const fooOption = element.find('#foo').getDOMNode();
      fooOption.selected = true;
      element.simulate('change');

      expect(hook).toBeCalled();
    });
  });
});
