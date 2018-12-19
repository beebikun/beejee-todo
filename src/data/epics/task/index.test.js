import { ActionsObservable } from 'redux-observable';
import { actions } from 'data/actions/task';
import * as epics from './epics';

const STORE = { value : {} };
const reducers = require('data/reducers');
const fetchParams = { page: 10 };
const getFetchingParams = jest.spyOn(reducers, 'getFetchingParams');
getFetchingParams.mockReturnValue(fetchParams);

const tasks = [ {id: 1}, {id: 2}, ];
const total = 10;
const pagesCount = 20;
const FETCH_ITEMS_PAYLOADS = {
  success: { tasks, total, pagesCount },
  api: fetchParams,
};
const rawTask = { username: 'u', text: 't', email: 'email@e.com', image: 'i' };
const task = { ...rawTask, id: 1 };
const ADD_ITEM_PAYLOADS = {
  request: rawTask,
  success: task,
  api: rawTask,
};
const editedTask = { text: 'edited', status: 10 };
const EDIT_ITEM_PAYLOADS = {
  request: { id: task.id, ...editedTask },
  success: {},
  api: { id: task.id, ...editedTask },
};


describe.each`
  name                | actionName      | apiMethod       | payloads
  ${'fetchItemsFlow'} | ${'fetchItems'} | ${'fetchItems'} | ${ FETCH_ITEMS_PAYLOADS }
  ${'addItemFlow'}    | ${'addItem'}    | ${'addItem'}    | ${ ADD_ITEM_PAYLOADS }
  ${'editItemFlow'}   | ${'editItem'}   | ${'editItem'}   | ${ EDIT_ITEM_PAYLOADS }
`('$name', ({ name, actionName, apiMethod, payloads }) => {
  const asyncAction = actions[actionName];
  const request = asyncAction.request(payloads.request);

  it('success', async (done) => {
    const result = payloads.success;
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
      [apiMethod]: jest.fn(() => apiResponse),
    };
    const action$ = ActionsObservable.of(request);
    const output$ = epics[name](action$, STORE, API);

    return output$.toPromise()
      .then((calledAction) => {
        expect(calledAction).toEqual(expectedAction);

        expect(API[apiMethod]).toHaveBeenCalledTimes(1);
        expect(API[apiMethod]).toHaveBeenCalledWith(payloads.api);
      });
  }
});

