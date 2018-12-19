import { combineEpics } from 'redux-observable';
import { loginFlow } from './epics';

export default combineEpics(
  loginFlow
);
