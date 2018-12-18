import { ofType } from 'redux-observable';

import { of, pipe } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { CONSTANTS, actions } from 'data/actions/task';
import { getFetchingParams } from 'data/reducers';

export function fetchItemsFlow(action$, store, api) {
  const asyncAction = actions.fetchItems;
  const fetchItems = async () => {
    const params = getFetchingParams(store.value);
    const result = await api.fetchItems(params);

    return asyncAction.success(result);
  };

  return action$.pipe(
    ofType(CONSTANTS.FETCH.REQUEST),
    switchMap(fetchItems),
    catchError(pipe(asyncAction.failure, of)),
  );
};


export function addItemFlow(action$, store, api) {
  const asyncAction = actions.addItem;
  const addItem = async ({ payload }) => {
    const result = await api.addItem(payload);

    return asyncAction.success(result);
  };

  return action$.pipe(
    ofType(CONSTANTS.ADD.REQUEST),
    switchMap(addItem),
    catchError(pipe(asyncAction.failure, of)),
  );
};
