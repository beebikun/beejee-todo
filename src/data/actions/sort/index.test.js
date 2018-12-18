import { CONSTANTS, actions } from './index';


it('set', () => {
  const sorting = { by: 'username', direction: 'asc' };
  const result = actions.set(sorting);
  expect(result).toEqual({
    payload: sorting,
    type: CONSTANTS.SET,
  });
});
