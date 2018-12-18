import store from 'data/storage';
import { getWrapper, skipTick } from './utils';

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
