import { combineReducers } from 'redux';

import TaskReducer from './TaskReducer';
import PageReducer from './PageReducer';
import SortReducer from './SortReducer';


const rootReducer = combineReducers({
  tasks: TaskReducer,
  page: PageReducer,
  sort: SortReducer,
});

export default rootReducer;

export function getFetchingParams(state) {
  return {
    page: state.page.current,
    sortField: state.sort.by,
    sortDirection: state.sort.direction,
  };
}
