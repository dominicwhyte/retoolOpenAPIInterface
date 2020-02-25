import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the interfacePage state domain
 */

const selectInterfacePageDomain = state => state.interfacePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by InterfacePage
 */

const makeSelectInterfacePage = () =>
  createSelector(
    selectInterfacePageDomain,
    substate => substate,
  );

export default makeSelectInterfacePage;
export { selectInterfacePageDomain };
