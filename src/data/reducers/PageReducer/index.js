import { CONSTANTS } from 'data/actions/page';

const initialState = {
  current: 0,
  max: 0,
};


export default function PageReducer(state=initialState, action) {
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
