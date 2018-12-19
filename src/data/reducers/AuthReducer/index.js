import { CONSTANTS } from 'data/actions/auth';

const initialState = {
  isLogin: false,
  isFailed: false,
};


export default function SortReducer(state=initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOGIN.SUCCESS:
      return action.payload ? { isLogin: true, isFailed: false } :
                              { isLogin: false, isFailed: true } ;
    case CONSTANTS.LOGIN.REQUEST:
      return { isLogin: false, isFailed: false };
    default:
      return state;
  }
}
