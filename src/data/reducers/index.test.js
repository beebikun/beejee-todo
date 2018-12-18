import reducer from './index';

it('initial state', () => {
  const next = reducer(undefined, {});
  expect(next)
    .toEqual({
      tasks: expect.anything(),
      page: expect.anything(),
      sort: expect.anything(),
    });
});
