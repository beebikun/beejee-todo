import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/todo';
import * as epics from './epics';

const todos = [ {id: 1}, {id: 2}, ];
jest.mock('data/reducers');

const { getFetchingParams } = require('data/reducers');
const fetchParams = { page: 10 };
getFetchingParams.mockReturnValue(fetchParams);

const STORE = { getState: jest.fn() };

describe('fetchItemsFlow', () => {
  const request = actions.fetchItems.request();

  it('success', () => {
    const expectedAction = actions.fetchItems.success(todos);
    const apiResponse = Promise.resolve(todos);

    expectFetch(expectedAction, apiResponse);
  });

  it('failure', () => {
    const error = Error('Failure reason');
    const expectedAction = actions.fetchItems.failure(error);
    const apiResponse = Promise.reject(error);

    expectFetch(expectedAction, apiResponse);
  });


  function expectFetch(expectedAction, apiResponse) {
    const API = {
      fetchItems: jest.fn(() => apiResponse),
    };

    const action$ = ActionsObservable.of(request);
    const output$ = epics.fetchItemsFlow(action$, STORE, API);

    return output$.toPromise()
      .then((calledAction) => {
        expect(calledAction).toEqual(expectedAction);

        expect(API.fetchItems).toHaveBeenCalledTimes(1);
        expect(API.fetchItems).toHaveBeenCalledWith(fetchParams);

        expect(getFetchingParams).toHaveBeenCalledTimes(1);
      });
  }
});
