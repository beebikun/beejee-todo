import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/page';
import { actions as taskActions } from 'data/actions/task';
import * as epics from './epics';

const pageNumber = 10;

it('setCurrentPageFlow', async (done) => {
  const prevAction = actions.setCurrent(pageNumber);
  const action$ = ActionsObservable.of(prevAction);
  const output$ = epics.setCurrentPageFlow(action$);

  const expectedAction = taskActions.fetchItems.request();
  const result = await output$.toPromise();
  expect(result)
    .toEqual(expectedAction);

  done();
});


it('setMaxPageFlow', async (done) => {
  const prevAction = taskActions.fetchItems.success({
    pagesCount: pageNumber
  });
  const action$ = ActionsObservable.of(prevAction);
  const output$ = epics.setMaxPageFlow(action$);

  const expectedAction = actions.setMax(pageNumber);
  const result = await output$.toPromise();
  expect(result)
    .toEqual(expectedAction);

  done();
});
