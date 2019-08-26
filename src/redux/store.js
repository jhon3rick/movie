/**
 * Store Redux
 */
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger({ predicate: (getState, action) => false }); // eslint-disable-line
const store = createStore (
  rootReducers(),
  {}, // initial state
  compose(
    applyMiddleware(
      thunk,
      loggerMiddleware
    ),
  )
);

export default store;
