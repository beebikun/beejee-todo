import CONSTANTS from './constants';


export const fetchItems = {
  request: () => ({ type: CONSTANTS.FETCH.REQUEST }),
  failure: (error) => ({ type: CONSTANTS.FETCH.ERROR, payload: error }),
  success: (result) => ({ type: CONSTANTS.FETCH.SUCCESS, payload: result }),
};

export const addItem = {
  request: (task) => ({ type: CONSTANTS.ADD.REQUEST, payload: task }),
  failure: (error) => ({ type: CONSTANTS.ADD.ERROR, payload: error }),
  success: (result) => ({ type: CONSTANTS.ADD.SUCCESS, payload: result }),
};

export const editItem = {
  request: (task) => ({ type: CONSTANTS.EDIT.REQUEST, payload: task }),
  failure: (error) => ({ type: CONSTANTS.EDIT.ERROR, payload: error }),
  success: (result) => ({ type: CONSTANTS.EDIT.SUCCESS, payload: result }),
};

export const setEditItem = (taskId) => ({
  type: CONSTANTS.SET_EDIT, payload: taskId,
});
