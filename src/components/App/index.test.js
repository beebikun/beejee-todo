import * as React from 'react';
import { shallow } from 'enzyme';

import App from './index';

it('render without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#TaskList').exists())
    .toBe(true);
  expect(wrapper.find('#Pagination').exists())
    .toBe(true);
  expect(wrapper.find('#TaskAdd').exists())
    .toBe(true);
});
