import { CONSTANTS } from 'data/actions/todo';

const initialState = [];

export default function TodoReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH.SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
