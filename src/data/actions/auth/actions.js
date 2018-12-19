import CONSTANTS from './constants';


export const login = {
  request: (data) => ({ type: CONSTANTS.LOGIN.REQUEST, payload: data }),
  failure: (error) => ({ type: CONSTANTS.LOGIN.ERROR, payload: error }),
  success: (isSuccess) => ({ type: CONSTANTS.LOGIN.SUCCESS, payload: isSuccess }),
};
