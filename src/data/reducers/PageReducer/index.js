import { CONSTANTS } from 'data/actions/page';
import { CONSTANTS as TASKS_CONSTANTS } from 'data/actions/task';

const initialState = {
  current: 0,
  max: 0,
};


export default function PageReducer(state=initialState, action) {
  console.log('LOG', action)
  switch (action.type) {
    case CONSTANTS.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CONSTANTS.SET_MAX:
      return {
        ...state,
        max: action.payload,
      };
    default:
      return state;
  }
}
