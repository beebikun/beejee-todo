import { combineEpics } from 'redux-observable';

import todoEpics from './todo';

export default combineEpics(todoEpics);