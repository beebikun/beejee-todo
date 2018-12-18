import { combineReducers } from 'redux';

import TodoReducer from './TodoReducer';
import PageReducer from './PageReducer';
import SortReducer from './SortReducer';


const rootReducer = combineReducers({
  todos: TodoReducer,
  page: PageReducer,
  sort: SortReducer,
});

export default rootReducer;

export function getFetchingParams(state) {
  return {
    page: state.page,
    sortField: state.sort.by,
    sortDirection: state.sort.direction,
  };
}
