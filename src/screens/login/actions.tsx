/**
 * Login actions
 */
import apiService from '../../providers/apiService';
import { createUser } from '../../providers/manageLogin';

import {
  DEFAULT_ACTION,
  SET_NAME,
  SET_PASSWORD,

  FETCHING_LOGIN_REQUEST,
  FETCHING_LOGIN_SUCCESS,
  FETCHING_LOGIN_FAILURE
} from './actions-type';

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  };
}

export function setName (name: string) {
  return {
    type: SET_NAME,
    payload: {name}
  };
}

export function setPassword (password: string) {
  return {
    type: SET_PASSWORD,
    payload: {password}
  };
}

export function fetchingLoginRequest (username: string, password: string) {
  return (dispatch: (param: Object)=>void) => {
    dispatch({ type: FETCHING_LOGIN_REQUEST });

    return new Promise(resolve => setTimeout(() => {
      const responseApi = createUser(username, password);
      return resolve(responseApi)
    }, 500));


    return apiService('login', {})
      .then(resp => {
        // resp = fakeApi; mokup api
        // @ts-ignore
        if (resp.code) {
          // @ts-ignore
          dispatch(fetchingLoginFail(resp));
        } else {
          dispatch(fetchingLoginSuccess(resp));
        }
        return resp;
      })
      .catch(() => {
        const login = {
          status: 'GLOBAL_STRS.FAIL',
          msg: 'GLOBAL_STRS.SERVER_ERROR'
        };
        dispatch(fetchingLoginFail(login));
        return login;
      });
  };
}
export function fetchingLoginSuccess (login: Object){
  return {
    type: FETCHING_LOGIN_SUCCESS,
    payload: { login }
  };
}

export function fetchingLoginFail (login: Object){
  return {
    type: FETCHING_LOGIN_FAILURE,
    payload: { login }
  };
}
