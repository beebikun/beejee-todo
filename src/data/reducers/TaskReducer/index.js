import { CONSTANTS } from 'data/actions/task';

const initialState = [];

export default function TaskReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH.SUCCESS:
      return action.payload.tasks;
    default:
      return state;
  }
}
