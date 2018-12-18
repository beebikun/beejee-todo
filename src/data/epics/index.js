import { combineEpics } from 'redux-observable';

import taskEpics from './task';
import pageEpics from './page';

export default combineEpics(taskEpics, pageEpics);