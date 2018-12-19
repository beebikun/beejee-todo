import store from 'data/storage';
import { getWrapper, skipTick } from './utils';

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
      current: 1,
      max: expect.any(Number),
    }),
    sort: { by: null, direction: null },
    auth: { isLogin: false, isFailed: false },
  };
  expect(state)
    .toMatchObject(expectedState);

  done();
});
