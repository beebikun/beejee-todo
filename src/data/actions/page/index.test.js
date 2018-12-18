import { CONSTANTS, actions } from './index';


it('setCurrent', () => {
  const page = 10;
  const result = actions.setCurrent(page);
  expect(result).toEqual({
    payload: page,
    type: CONSTANTS.SET_CURRENT,
  });
});


it('setMax', () => {
  const page = 10;
  const result = actions.setMax(page);
  expect(result).toEqual({
    payload: page,
    type: CONSTANTS.SET_MAX,
  });
});
