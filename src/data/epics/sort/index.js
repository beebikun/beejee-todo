import { combineEpics } from 'redux-observable';
import { setSortingFlow } from './epics';

export default combineEpics(
  setSortingFlow,
);
