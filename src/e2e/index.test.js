import * as React from 'react';
import App from 'components';
import { mount } from 'enzyme';

import store from 'data/storage';

function skipTick() {
  return Promise.resolve().then();
}

async function getWrapper() {
  const wrapper = mount(<App/>);

  // wait for all promises resolved
  await skipTick();

  return wrapper.update();
}

describe.skip('e2e', () => {

  it('Initial state: fetch items afetr page onload', async (done) => {
    await getWrapper();
    const state = store.getState();
    const expectedTask = {
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      text: expect.any(String),
      status: expect.any(Number),
      image_path: expect.any(String),
    };
    const expectedState = {
      tasks: expect.arrayContaining([expectedTask]),
      page: expect.objectContaining({
        current: 0,
        max: expect.any(Number),
      }),
    };
    expect(state)
      .toMatchObject(expectedState);

    done();
  });

  it('Change page', async (done) => {
    const wrapper = await getWrapper();
    const nextButton = wrapper.find('PaginationButton').last();
    const prevState = store.getState();

    nextButton.simulate('click');

    await skipTick();

    const state = store.getState();

    expect(state.page.current)
      .toEqual(prevState.page.current + 1);
    expect(state.page.max)
      .toEqual(prevState.page.max);

    expect(state.tasks)
      .not
      .toEqual(prevState.tasks);

    expect(state.sorting)
      .toEqual(prevState.sorting);

    done();
  });


  it('Change sorting', async (done) => {
    const wrapper = await getWrapper();
    const headerTh = wrapper.find('th').at(1);
    expect(headerTh.text())
      .toEqual('Username-');
    const sortButton = headerTh.find('SortingButton').at(0);
    const prevState = store.getState();
    expect(prevState.sort)
      .toEqual({ by: null, direction: null });

    sortButton.simulate('click');

    await skipTick();

    const state = store.getState();
    expect(state.sort)
      .toEqual({ by: 'username', direction: 'asc' });

    expect(state.page)
      .toEqual(prevState.page);

    expect(state.tasks)
      .not
      .toEqual(prevState.tasks);

    wrapper.update();
    expect(headerTh.text())
      .toEqual('Username↑');

    done();
  });

});
