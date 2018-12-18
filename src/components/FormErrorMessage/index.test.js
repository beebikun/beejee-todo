import * as React from 'react';
import { shallow } from 'enzyme';

import FormErrorMessage from './index';

it('No errors >> null', () => {
  const fields = {};
  const wrapper = shallow(<FormErrorMessage />);
  expect(wrapper.name())
    .toEqual(null);
});

it('Render errors', () => {
  const errors = [
    'error1', 'error2',
  ];
  const wrapper = shallow(<FormErrorMessage errors={ errors } />);
  const items = wrapper.find('.pure-form-message');
  expect(items).toHaveLength(errors.length);
  errors.forEach((msg, idx) => {
    expect(items.at(idx).text())
      .toEqual(msg);
  });
});
