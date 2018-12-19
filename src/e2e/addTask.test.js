import store from 'data/storage';
import { getWrapper, fillForm } from './utils';

const PREFIX = 'TaskAdd';
const FIELDS = { username: 'username', email: 'email@ex.com', text: 'text', image: 'img.png' };

it('add task', async (done) => {
  const wrapper = await getWrapper();
  const prevState = store.getState();

  await fillForm(wrapper, 'TaskAdd', FIELDS);

  const state = store.getState();
  expect(state.page)
    .toEqual(prevState.page);

  expect(state.tasks)
    .toHaveLength(prevState.tasks.length + 1);
  expect(state.tasks.slice(1))
    .toEqual(prevState.tasks);

  expect(state.sorting)
    .toEqual(prevState.sorting);

  done();
});
