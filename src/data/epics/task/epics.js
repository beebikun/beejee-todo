import { ofType } from 'redux-observable';

import { of, pipe } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { actions, CONSTANTS } from 'data/actions/task';
import { getFetchingParams } from 'data/reducers';

/* fetch items and set max_page */
export function fetchItemsFlow(action$, store, api) {
  const fetchItems = async () => {
    const params = getFetchingParams(store.value);
    const result = await api.fetchItems(params);

    return actions.fetchItems.success(result);
  };

  return action$.pipe(
    ofType(CONSTANTS.FETCH.REQUEST),
    switchMap(fetchItems),
    catchError(pipe(actions.fetchItems.failure, of)),
  );
};
