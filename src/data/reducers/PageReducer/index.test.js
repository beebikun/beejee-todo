import { CONSTANTS } from 'data/actions/page';
import reducer from './index';

it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual({
      current: 0,
      max: 0
    });
});

it('CONSTANTS.SET_CURRENT: replace current', () => {
  const prev = { current: 10, max: 20 };
  const payload = 7;
  const next = reducer(prev, { type: CONSTANTS.SET_CURRENT, payload });

  expect(next)
    .toEqual({ max: prev.max, current: payload });
});

it('CONSTANTS.SET_MAX: replace max', () => {
  const prev = { current: 0, max: 0 };
  const payload = 7;
  const next = reducer(prev, { type: CONSTANTS.SET_MAX, payload });

  expect(next)
    .toEqual({ current: prev.current, max: payload });
});


it('Unknown type: return old state', () => {
  const prev = { current: 10, max: 20 };
  const payload = { current: 1, max: 2 };
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});