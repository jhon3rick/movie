/**
 * Home reducer
 */
import { fromJS } from 'immutable';

import {
  SET_NAME,
  SET_PASSWORD,
  DEFAULT_ACTION,
  FETCHING_LOGIN_REQUEST,
  FETCHING_LOGIN_SUCCESS,
  FETCHING_LOGIN_FAILURE
} from './actions-type';

const initialState = fromJS({
  login: [],
  name: '',
  nombre: 'LOGIN CONTAINER',
  password: '',
  loadRequest: false
});

// @ts-ignore
function loginReducer (state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return state.set('name', action.payload.name);
    case SET_PASSWORD:
        return state.set('password', action.payload.password);
    case DEFAULT_ACTION:
      return state;
    case FETCHING_LOGIN_REQUEST:
      return state.set('loadRequest', true);
    case FETCHING_LOGIN_SUCCESS:
      return state
        .set('loadRequest', false)
        .set('login', action.payload.login);
    case FETCHING_LOGIN_FAILURE:
      return state
        .set('loadRequest', false)
        .set('login', action.payload.login);
    default:
      return state;
  }
}
export default loginReducer;