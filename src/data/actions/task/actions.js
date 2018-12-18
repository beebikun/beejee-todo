import CONSTANTS from './constants';


export const fetchItems = {
  request: () => ({ type: CONSTANTS.FETCH.REQUEST }),
  failure: (error) => ({ type: CONSTANTS.FETCH.ERROR, payload: error }),
  success: (result) => ({ type: CONSTANTS.FETCH.SUCCESS, payload: result }),
};
