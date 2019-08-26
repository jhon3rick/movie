/*
 * Core reducer
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION
} from './actions-type';

const initialState = fromJS({
  loadRequest: false
});

function headerReducer (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default headerReducer;
