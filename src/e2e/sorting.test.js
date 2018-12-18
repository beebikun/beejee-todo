import store from 'data/storage';
import { getWrapper, skipTick } from './utils';

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
