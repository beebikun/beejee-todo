import store from 'data/storage';
import { getWrapper, skipTick } from './utils';

const FIELDS = { username: 'username', email: 'email@ex.com', text: 'text', image: 'img.png' };
it('add task', async (done) => {
  const wrapper = await getWrapper();
  const prevState = store.getState();

  const form = wrapper.find('.TaskAdd form');
  Object.keys(FIELDS).forEach(name => {
    const input = form.find(`[name="${ name }"]`);
    const eventKey = name === 'image' ? 'files' : 'value';
    const value = name === 'image' ? [FIELDS[name]] : FIELDS[name];
    input.simulate('change', { target: { [ eventKey ]: value, name } });
  });

  wrapper.update();
  form.simulate('submit');

  await skipTick();

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
