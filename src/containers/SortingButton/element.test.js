import * as React from 'react';
import { shallow } from 'enzyme';

import SortingButton from './element';

it('isActive + asc', () => {
  const onSort = jest.fn();
  const props = {
    onSort, isActive: true, direction: 'asc',
  };
  const wrapper = shallow(<SortingButton { ...props } />);
  expect(wrapper.hasClass('pure-button-primary'))
    .toBe(true);
  expect(wrapper.text())
    .toEqual('↑');
});

it('isActive + desc', () => {
  const onSort = jest.fn();
  const props = {
    onSort, isActive: true, direction: 'desc',
  };
  const wrapper = shallow(<SortingButton { ...props } />);
  expect(wrapper.hasClass('pure-button-primary'))
    .toBe(true);
  expect(wrapper.text())
    .toEqual('↓');
});

it('Not active', () => {
  const onSort = jest.fn();
  const props = {
    onSort, isActive: false, direction: '',
  };
  const wrapper = shallow(<SortingButton { ...props } />);
  expect(wrapper.hasClass('pure-button-primary'))
    .toBe(false);
  expect(wrapper.text())
    .toEqual('-');
});

it('Click', () => {
  const onSort = jest.fn();
  const props = {
    onSort, isActive: false, direction: '',
  };
  const wrapper = shallow(<SortingButton { ...props } />);
  wrapper.simulate('click');

  expect(onSort).toHaveBeenCalled();
});
