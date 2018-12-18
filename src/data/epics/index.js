import { combineEpics } from 'redux-observable';

import taskEpics from './task';
import pageEpics from './page';
import sortEpics from './sort';

export default combineEpics(taskEpics, pageEpics, sortEpics);
