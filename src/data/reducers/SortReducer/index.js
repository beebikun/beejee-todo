import { CONSTANTS } from 'data/actions/sort';

const initialState = {
  by: null,
  direction: null,
};


export default function SortReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.SET:
      return action.payload;
    default:
      return state;
  }
}
