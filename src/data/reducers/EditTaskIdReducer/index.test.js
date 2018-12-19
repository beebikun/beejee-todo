import { CONSTANTS } from 'data/actions/task';
import reducer from './index';

const initialState = null;

it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual(initialState);
});

it('Unknown type: return old state', () => {
  const prev = 10;
  const payload = 20;
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});

it('CONSTANTS.SET_EDIT: replace current', () => {
  const prev = 10;
  const payload = 20;
  const next = reducer(prev, { type: CONSTANTS.SET_EDIT, payload });

  expect(next)
    .toEqual(payload);
});


it('CONSTANTS.EDIT_ITEM.REQUEST: reset value', () => {
  const prev = 10;
  const next = reducer(prev, { type: CONSTANTS.EDIT.REQUEST });

  expect(next)
    .toEqual(initialState);
});