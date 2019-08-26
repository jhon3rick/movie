import { createSelector } from 'reselect';

/**
 * Direct selector to the core state domain
 */
// @ts-ignore
const selectAppDomain = () => state => state.App;
// @ts-ignore
const selectHeaderDomain = () => state => state.Header;
/**
 * Other specific selectors
 */

/**
 * Default selector used by Core
 */

const selectHeader = () => createSelector(
  selectAppDomain(),
  selectHeaderDomain(),
  (app, header) => { return { ...app.toJS(), ...header.toJS() }; }
);

export default selectHeader;
export {
  selectAppDomain
};