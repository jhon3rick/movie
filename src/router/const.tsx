// import Screen
import Home from '../screens/home';
import Login from '../screens/login';
import Unauthorized from '../screens/unauthorized';

export const ARRAY_ROUTER_LOGOUT = [
  {
    _id: 'login',
    path: '/',
    exact: true,
    stack: 'authStack',
    component: Login
  },
]

export const ARRAY_ROUTER = [
  // navigation Screen
  {
    _id: 'home',
    path: '/home',
    exact: true,
    stack: 'appStack',
    component: Home
  },
  /*
  {
    _id: 'unauthorized',
    path: '/unauthorized',
    stack: 'appStack',
    component: Unauthorized
  }
  */
];

export const ARRAY_MODULES = [];