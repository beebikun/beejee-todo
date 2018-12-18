import { combineEpics } from 'redux-observable';
import { setCurrentPageFlow, setMaxPageFlow } from './epics';

export default combineEpics(
  setCurrentPageFlow,
  setMaxPageFlow,
);
