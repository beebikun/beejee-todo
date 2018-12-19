import { ofType } from 'redux-observable';

import { of, pipe } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { CONSTANTS, actions } from 'data/actions/auth';

export function loginFlow(action$, store, api) {
  const asyncAction = actions.login;
  const login = async ({ payload }) => {
    const result = await api.login(payload);

    return asyncAction.success(result);
  };

  return action$.pipe(
    ofType(CONSTANTS.LOGIN.REQUEST),
    switchMap(login),
    catchError(pipe(asyncAction.failure, of)),
  );
};
