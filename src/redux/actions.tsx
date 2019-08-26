/*
 * App actions
 */
// import apiService from '../providers/apiService';
import {
  DEFAULT_ACTION,

  SET_ROL,
  SET_NAME_APP
} from './actions-type';

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  };
}

export function setRol (rol: string) {
  localStorage.setItem('rol', rol);
  return {
    type: SET_ROL,
    payload: { rol }
  };
}

export function setNameApp (nameApp: string) {
  return {
    type: SET_NAME_APP,
    payload: { nameApp }
  };
}
