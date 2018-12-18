import { ofType } from 'redux-observable';

import { from, of, pipe } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { actions, CONSTANTS } from 'data/actions/todo';
import { getFetchingParams } from 'data/reducers';


export function fetchItemsFlow(action$, store, api) {
  const mapped = () => {
    const onSuccess = map(actions.fetchItems.success);
    const onError = catchError(pipe(actions.fetchItems.failure, of));
    const params = getFetchingParams(store.getState());
    const fetch = api.fetchItems(params);

    return from(fetch)
      .pipe(onSuccess, onError);
  };

  return action$.pipe(
    ofType(CONSTANTS.FETCH.REQUEST),
    switchMap(mapped),
  );
};