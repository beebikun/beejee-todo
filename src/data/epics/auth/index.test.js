import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/auth';
import * as epics from './epics';

const STORE = { value : {} };


describe('Login', () => {
  const data = { username: 'u', password: 'p' };
  const asyncAction = actions.login;
  const request = asyncAction.request(data);

  it('success', async (done) => {
    const result = true;
    const expectedAction = asyncAction.success(result);
    const apiResponse = Promise.resolve(result);

    await expectFetch(expectedAction, apiResponse);

    done();
  });

  it('failure', async (done) => {
    const error = Error('Failure reason');
    const expectedAction = asyncAction.failure(error);
    const apiResponse = Promise.reject(error);

    await expectFetch(expectedAction, apiResponse);

    done();
  });


  function expectFetch(expectedAction, apiResponse) {
    const API = {
      login: jest.fn(() => apiResponse),
    };
    const action$ = ActionsObservable.of(request);
    const output$ = epics.loginFlow(action$, STORE, API);

    return output$.toPromise()
      .then((calledAction) => {
        expect(calledAction).toEqual(expectedAction);

        expect(API.login).toHaveBeenCalledTimes(1);
        expect(API.login).toHaveBeenCalledWith(data);
      });
  }
});
