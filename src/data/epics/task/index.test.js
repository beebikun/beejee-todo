import { ActionsObservable } from 'redux-observable';
import configureStore from 'redux-mock-store';
import { actions } from 'data/actions/task';
import * as epics from './epics';


const tasks = [ {id: 1}, {id: 2}, ];
const total = 10;
const pagesCount = 20;
const STORE = { value : {} };

jest.mock('data/reducers');
const { getFetchingParams } = require('data/reducers');
const fetchParams = { page: 10 };
getFetchingParams.mockReturnValue(fetchParams);



describe('fetchItemsFlow', () => {
  const request = actions.fetchItems.request();

  it('success', async (done) => {
    const result = { tasks, total, pagesCount };
    const expectedAction = actions.fetchItems.success(result);
    const apiResponse = Promise.resolve(result);

    await expectFetch(expectedAction, apiResponse);

    done();
  });

  it('failure', async (done) => {
    const error = Error('Failure reason');
    const expectedAction = actions.fetchItems.failure(error);
    const apiResponse = Promise.reject(error);

    await expectFetch(expectedAction, apiResponse);

    done();
  });


  function expectFetch(expectedAction, apiResponse) {
    const API = {
      fetchItems: jest.fn(() => apiResponse),
    };
    getFetchingParams.mockClear();
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
