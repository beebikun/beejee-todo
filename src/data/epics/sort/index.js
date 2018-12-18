import { combineEpics } from 'redux-observable';
import { getCurrentPageFlow, setMaxPageFlow } from './epics';

export default combineEpics(
  getCurrentPageFlow,
  setMaxPageFlow,
);
