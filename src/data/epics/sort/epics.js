import { ofType, ActionsObservable } from 'redux-observable';

import { switchMap } from 'rxjs/operators';

import { actions, CONSTANTS } from 'data/actions/sort';
import {
  actions as taskActions,
  CONSTANTS as TASKS_CONSTANTS,
} from 'data/actions/task';


export function setSortingFlow(action$) {
  const fetchItems = () => {
    const nextAction = taskActions.fetchItems.request();

    return ActionsObservable.of(nextAction);
  };

  return action$.pipe(
    ofType(CONSTANTS.SET),
    switchMap(fetchItems),
  );
};