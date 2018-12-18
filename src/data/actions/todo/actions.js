import CONSTANTS from './constants';


export const fetchItems = {
  request: () => ({ type: CONSTANTS.FETCH.REQUEST }),
  success: (todos) => ({ type: CONSTANTS.FETCH.SUCCESS, payload: todos }),
  failure: (error) => ({ type: CONSTANTS.FETCH.ERROR, payload: error }),
};
