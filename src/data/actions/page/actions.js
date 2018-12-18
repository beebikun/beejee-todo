import CONSTANTS from './constants';


export const setCurrent = (pageNumber) => ({
  type: CONSTANTS.SET_CURRENT, payload: pageNumber,
});


export const setMax = (maxNumber) => ({
  type: CONSTANTS.SET_MAX, payload: maxNumber,
});