import * as React from 'react';
import App from 'components';
import { mount } from 'enzyme';
import store from 'data/storage';

export function skipTick() {
  return Promise.resolve().then();
}

export async function getWrapper() {
  const wrapper = mount(<App/>);

  // wait for all promises resolved
  await skipTick();

  return wrapper.update();
}

export async function fillForm(wrapper, formName, data) {
  const form = wrapper.find('#' + formName).find('SubmitForm');
  Object.keys(data).forEach(name => {
    const _name = formName + name
    const input = form.find(`[name="${ _name }"]`);
    const eventKey = name === 'image' ? 'files' : 'value';
    const value = name === 'image' ? [ data[name] ] : data[name];
    input.simulate('change', { target: { [ eventKey ]: value, name: _name } });
  });

  form.instance().submit({ preventDefault: jest.fn() });
  await skipTick();
}

export async function login(data, newLoginState, errorMsg) {
  const wrapper = await getWrapper();
  const prevState = store.getState();
  expect(prevState.auth)
    .toEqual({ isLogin: false, isFailed: false });

  await fillForm(wrapper, 'LoginForm', data);

  const state = store.getState();
  expect(state)
    .toEqual({
      ...prevState,
      auth: newLoginState,
    });

  wrapper.update();
  const logginFormText = wrapper.find('LoginForm').text();
  if (errorMsg) {
    expect(logginFormText)
      .toMatch(errorMsg);
  } else {
    expect(logginFormText)
      .toMatch('Welcome!');
  }

}