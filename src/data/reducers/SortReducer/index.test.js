import { CONSTANTS } from 'data/actions/sort';
import reducer from './index';

it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual({
      by: null,
      direction: null
    });
});

it('CONSTANTS.SET: replace current', () => {
  const prev = { by: 'username', direction: 'asc' };
  const payload = { by: null, direction: null };
  const next = reducer(prev, { type: CONSTANTS.SET, payload });

  expect(next)
    .toEqual(payload);
});


it('Unknown type: return old state', () => {
  const prev = { by: 'username', direction: 'asc' };
  const payload = { by: 'username', direction: 'desc' };
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});