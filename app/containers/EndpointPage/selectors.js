import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the endpointPage state domain
 */

const selectEndpointPageDomain = state => state.endpointPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EndpointPage
 */

const makeSelectEndpointPage = () =>
  createSelector(
    selectEndpointPageDomain,
    substate => substate,
  );

const selectRequestResponse = () =>
  createSelector(
    selectEndpointPageDomain,
    substate => substate.requestResponse,
  );

const selectRequestLoading = () =>
  createSelector(
    selectEndpointPageDomain,
    substate => substate.requestLoading,
  );

export default makeSelectEndpointPage;
export {
  selectEndpointPageDomain,
  selectRequestResponse,
  selectRequestLoading,
};
