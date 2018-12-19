import reducer, { getFetchingParams } from './index';

it('initial state', () => {
  const next = reducer(undefined, {});
  expect(next).toHaveProperty('auth');
  expect(next).toHaveProperty('tasks');
  expect(next).toHaveProperty('page');
  expect(next).toHaveProperty('sort');
});


it('getFetchingParams', () => {
  const current = 10;
  const by = 'username';
  const direction = 'asc';

  const state = { page: { current }, sort: { by, direction } };
  const params = getFetchingParams(state);
  expect(params)
    .toEqual({
      page: current,
      sortField: by,
      sortDirection: direction,
    });
});
