import { Store, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import services from '../services';

export default function configureStore(initialState) {
  const epicMiddleware = createEpicMiddleware({dependencies : services});

  // configure middlewares
  const middlewares = applyMiddleware(
    epicMiddleware,
  );

  // create store
  const store = createStore(
    rootReducer,
    initialState,
    middlewares,
  );
  epicMiddleware.run(rootEpic);

  return store;
}
