import { CONSTANTS } from 'data/actions/todo';
import reducer from './index';

it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual([]);
});

it('CONSTANTS.FETCH.SUCCESS: replace list', () => {
  const prev = [ {id: 1} ];
  const payload = [ {id: 3} ];
  const next = reducer(prev, { type: CONSTANTS.FETCH.SUCCESS, payload });

  expect(next)
    .toEqual(payload);
});


it('Unknown. type: return old state', () => {
  const prev = [ {id: 1} ];
  const payload = [ {id: 3} ];
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});