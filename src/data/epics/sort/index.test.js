import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/sort';
import { actions as taskActions } from 'data/actions/task';
import * as epics from './epics';

const sorting = { by: 'username', direction: 'asc' };

it('setSortingFlow', async (done) => {
  const prevAction = actions.set(sorting);
  const action$ = ActionsObservable.of(prevAction);
  const output$ = epics.setSortingFlow(action$);

  const expectedAction = taskActions.fetchItems.request();
  const result = await output$.toPromise();
  expect(result)
    .toEqual(expectedAction);

  done();
});
