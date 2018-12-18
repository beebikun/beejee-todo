import * as React from 'react';
import { shallow } from 'enzyme';

import App from './index';

it('render without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#TodoList').exists())
    .toBe(true);
});
