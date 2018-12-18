import * as React from 'react';
import App from 'components';
import { mount } from 'enzyme';

export function skipTick() {
  return Promise.resolve().then();
}

export async function getWrapper() {
  const wrapper = mount(<App/>);

  // wait for all promises resolved
  await skipTick();

  return wrapper.update();
}
