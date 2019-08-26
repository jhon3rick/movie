import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
// @ts-ignore
const selectLoginDomain = () => state => state.Login;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */

const selectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

export default selectLogin;
export {
  selectLoginDomain
};
