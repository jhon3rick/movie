import { createSelector } from 'reselect';

/**
 * Direct selector to the core state domain
 */
// @ts-ignore
const selectAppDomain = () => state => state.App;
/**
 * Other specific selectors
 */

/**
 * Default selector used by Core
 */

const selectApp = () => createSelector(
  selectAppDomain(),
  (substate) => substate.toJS()
);

export default selectApp;