import { CONSTANTS } from 'data/actions/task';

const initialState = null;

export default function SortReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.SET_EDIT:
      return action.payload;
    case CONSTANTS.EDIT.REQUEST:
      return initialState;
    default:
      return state;
  }
}
