import * as React from 'react';
import { shallow } from 'enzyme';

import PaginationButton from './index';


it('render with onClick > button is enablec', () => {
  const onClick = jest.fn();
  const symbol = 'Hello';
  const props = { onClick, symbol };
  const wrapper = shallow(<PaginationButton {...props} />);

  expect(wrapper.text())
    .toEqual(symbol);

  expect(wrapper.props().disabled)
    .toBe(false);

  wrapper.simulate('click');
  expect(onClick)
    .toBeCalled();
});


it('render without onClick > button is disabled', () => {
  const symbol = 'Hello';
  const props = { symbol };
  const wrapper = shallow(<PaginationButton {...props} />);

  expect(wrapper.text())
    .toEqual(symbol);

  expect(wrapper.props().disabled)
    .toBe(true);
});
