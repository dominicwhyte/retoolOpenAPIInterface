import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the openApiSpecsPage state domain
 */

const selectOpenApiSpecsPageDomain = state =>
  state.openApiSpecsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OpenApiSpecsPage
 */

const makeSelectOpenApiSpecsPage = () =>
  createSelector(
    selectOpenApiSpecsPageDomain,
    substate => substate,
  );

export default makeSelectOpenApiSpecsPage;
export { selectOpenApiSpecsPageDomain };
