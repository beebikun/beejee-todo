import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/task';
import * as epics from './epics';

const STORE = { value : {} };


describe('fetchItemsFlow', () => {
  const reducers = require('data/reducers');
  const fetchParams = { page: 10 };
  const getFetchingParams = jest.spyOn(reducers, 'getFetchingParams');
  getFetchingParams.mockReturnValue(fetchParams);

  const tasks = [ {id: 1}, {id: 2}, ];
  const total = 10;
  const pagesCount = 20;
  const asyncAction = actions.fetchItems;
  const request = asyncAction.request();

  it('success', async (done) => {
    const result = { tasks, total, pagesCount };
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


describe('addItemFlow', () => {
  const rowTask = { username: 'u', text: 't', email: 'email@e.com', image: 'i' };
  const task = { ...rowTask, id: 1 };
  const asyncAction = actions.addItem;
  const request = asyncAction.request(rowTask);

  it('success', async (done) => {
    const result = task;
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
      addItem: jest.fn(() => apiResponse),
    };
    const action$ = ActionsObservable.of(request);
    const output$ = epics.addItemFlow(action$, STORE, API);

    return output$.toPromise()
      .then((calledAction) => {
        expect(calledAction).toEqual(expectedAction);

        expect(API.addItem).toHaveBeenCalledTimes(1);
        expect(API.addItem).toHaveBeenCalledWith(rowTask);
      });
  }
});
