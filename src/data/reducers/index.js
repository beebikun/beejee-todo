import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import TaskReducer from './TaskReducer';
import PageReducer from './PageReducer';
import SortReducer from './SortReducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
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
