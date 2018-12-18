import { combineEpics } from 'redux-observable';
import { fetchItemsFlow, addItemFlow } from './epics';

export default combineEpics(
  fetchItemsFlow, addItemFlow
);
