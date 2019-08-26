import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
// import screen reducer
import Home from '../screens/home/reducer';
import Login from '../screens/login/reducer';

import Header from '../containers/header/reducer';

// import component reducer
import {
  DEFAULT_ACTION,
  SET_ROL,
  SET_NAME_APP
} from './actions-type';

const appInitialState = fromJS({
  rol: localStorage.getItem('rol') || '',
  nameApp: 'MyVideos',
  loadRequestGlobal: false,
  interfaces: {}
});

function appReducer (state = appInitialState, action: any) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_ROL:
      return state.set('rol', action.payload.rol);
    case SET_NAME_APP:
      return state.set('nameApp', action.payload.nameApp);

    default:
      return state;
  }
}

export default function rootReducers () {
  return combineReducers({
    // combine reducer
    Header,
    Home,
    Login,
    App: appReducer
  });
}
