import { createSelector } from 'reselect';

/**
 * Direct selector to the home state domain
 */
// @ts-ignore
const selectHomeDomain = () => state => state.Home;
// @ts-ignore
const selectAppDomain = () => state => state.App;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const selectHome = () => createSelector(
  selectHomeDomain(),
  selectAppDomain(),
  (home, app) => { return { ...home.toJS(), ...app.toJS() }; }
);

export default selectHome;
export {
  selectAppDomain,
  selectHomeDomain
};
