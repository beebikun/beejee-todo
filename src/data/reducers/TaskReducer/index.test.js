import { CONSTANTS } from 'data/actions/task';
import reducer from './index';

it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual([]);
});

it('Unknown. type: return old state', () => {
  const prev = [ {id: 1} ];
  const payload = [ {id: 3} ];
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});

it('CONSTANTS.FETCH.SUCCESS: replace list', () => {
  const prev = [ {id: 1} ];
  const payload = { tasks: [ {id: 3} ] };
  const next = reducer(prev, { type: CONSTANTS.FETCH.SUCCESS, payload });

  expect(next)
    .toEqual(payload.tasks);
});

it('CONSTANTS.ADD.SUCCESS: add item to the start', () => {
  const prev = [ { id: 1 }, { id: 2 }, { id: 3 }, ];
  const payload = { id: 4 };
  const next = reducer(prev, { type: CONSTANTS.ADD.SUCCESS, payload });

  expect(next)
    .toEqual([payload, ...prev]);
});


describe('CONSTANTS.EDIT.SUCCESS: find and edit item', () => {
  it('item in list: replace', () => {
    const prev = [ { id: 1 }, { id: 2, text: 'old' }, { id: 3 }, ];
    const payload = { id: 2, text: 'new' };
    const next = reducer(prev, { type: CONSTANTS.EDIT.SUCCESS, payload });

    expect(next)
      .toEqual([prev[0], payload, prev[2]]);
  });

  it('item notin list: do nothing', () => {
    const prev = [ { id: 1 }, { id: 2, text: 'old' }, { id: 3 }, ];
    const payload = { id: 4, text: 'new' };
    const next = reducer(prev, { type: CONSTANTS.EDIT.SUCCESS, payload });

    expect(next)
      .toEqual(prev);
  });
});

