import { CONSTANTS } from 'data/actions/task';

const initialState = [];

export default function TaskReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH.SUCCESS:
      return action.payload.tasks;
    case CONSTANTS.ADD.SUCCESS:
      return [action.payload, ...state].slice(0, 3);
    case CONSTANTS.EDIT.SUCCESS:
      const idx = state.findIndex(({ id }) => id === action.payload.id);
      if (idx < 0) return state;
      return Object.assign([], state, { [ idx ]: action.payload });
    default:
      return state;
  }
}
