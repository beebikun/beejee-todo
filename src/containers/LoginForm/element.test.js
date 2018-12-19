import * as React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './element';


it('Init state', () => {
  const auth = { isLogin: false, isFailed: false };
  const onLogin = jest.fn();
  const wrapper = shallow(<LoginForm onLogin={ onLogin } { ...auth } />);
  const SubmitForm = wrapper.find('SubmitForm');
  expect(SubmitForm.props())
    .toEqual({
      onSubmit: onLogin,
      fields: expect.any(Array),
      errors: null,
      formName: 'LoginForm',
    });
});

it('With error', () => {
  const auth = { isLogin: false, isFailed: true };
  const onLogin = jest.fn();
  const wrapper = shallow(<LoginForm onLogin={ onLogin } { ...auth } />);
  const SubmitForm = wrapper.find('SubmitForm');
  expect(SubmitForm.props())
    .toEqual({
      onSubmit: onLogin,
      fields: expect.any(Array),
      errors: expect.any(Array),
      formName: 'LoginForm',
    });
});

it('Login state', () => {
  const auth = { isLogin: true, isFailed: false };
  const onLogin = jest.fn();
  const wrapper = shallow(<LoginForm onLogin={ onLogin } { ...auth } />);
  const SubmitForm = wrapper.find('SubmitForm');
  expect(SubmitForm.exists()).toBe(false);
  expect(wrapper.text().trim()).toEqual('Welcome!');
});
