import { combineEpics } from 'redux-observable';
import { fetchItemsFlow, addItemFlow, editItemFlow } from './epics';

export default combineEpics(
  fetchItemsFlow, addItemFlow, editItemFlow
);
