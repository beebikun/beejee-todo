import { ofType, ActionsObservable } from 'redux-observable';

import { switchMap } from 'rxjs/operators';

import { actions, CONSTANTS } from 'data/actions/page';
import {
  actions as taskActions,
  CONSTANTS as TASKS_CONSTANTS,
} from 'data/actions/task';


export function setCurrentPageFlow(action$) {
  const fetchItems = () => {
    const nextAction = taskActions.fetchItems.request();

    return ActionsObservable.of(nextAction);
  };

  return action$.pipe(
    ofType(CONSTANTS.SET_CURRENT),
    switchMap(fetchItems),
  );
};

export function setMaxPageFlow(action$) {
  const setMax = ({ payload }) => {
    const nextAction = actions.setMax(payload.pagesCount);

    return ActionsObservable.of(nextAction);
  };

  return action$.pipe(
    ofType(TASKS_CONSTANTS.FETCH.SUCCESS),
    switchMap(setMax),
  );
};
