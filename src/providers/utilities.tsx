/**
 * utilities
 */
// import moment from 'moment';
import 'moment/locale/es';

import { ARRAY_ROUTER } from '../router/const';

export function updateRol (rol: string) {
  if (rol !== localStorage.getItem('rol')) {
    localStorage.setItem('rol', rol);
  }
}

export function isAutorizhed (path: string, rol: string) {
  const aut = ARRAY_ROUTER.filter( route => '/'+route.path.split('/')[1] === path)[0];
  // @ts-ignore
  return (aut.authorization.indexOf(rol) !== -1);
}
