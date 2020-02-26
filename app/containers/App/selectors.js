/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.success,
  );
const makeSelectInfo = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.info,
  );

const selectOpenApiSpecs = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.specs,
  );

const selectOpenApi = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.api,
  );

export {
  selectGlobal,
  selectOpenApi,
  makeSelectError,
  makeSelectSuccess,
  makeSelectInfo,
  selectOpenApiSpecs,
};
