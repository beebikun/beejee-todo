import { combineEpics } from 'redux-observable';

import authEpics from './auth';
import taskEpics from './task';
import pageEpics from './page';
import sortEpics from './sort';

export default combineEpics(authEpics, taskEpics, pageEpics, sortEpics);
