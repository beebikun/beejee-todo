import axios from 'axios';
import store from 'data/storage';
import { getWrapper, fillForm } from './utils';


const PREFIX = 'TaskAdd';
const FIELDS = { username: 'username', email: 'email@ex.com', text: 'text', image: 'img.png' };
const { image, ...data } = FIELDS;
axios.post.mockReturnValueOnce(Promise.resolve({ data: {
  status: 'ok',
  message: { id: 10, status: 0, image_path: 'path', ...data },
}}));

it('add task', async (done) => {
  const wrapper = await getWrapper();
  const prevState = store.getState();

  await fillForm(wrapper, 'TaskAdd', FIELDS);

  const state = store.getState();
  expect(state.page)
    .toEqual(prevState.page);

  expect(state.tasks)
    .toHaveLength(prevState.tasks.length);

  expect(state.tasks.slice(1))
    .toEqual(prevState.tasks.slice(0,2));
  expect(state.tasks[0])
    .not.toEqual(prevState.tasks[0]);

  expect(state.sorting)
    .toEqual(prevState.sorting);

  done();
});
