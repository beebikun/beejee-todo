import CONSTANTS from './constants';


export const set = (sorting) => ({
  type: CONSTANTS.SET, payload: sorting,
});
