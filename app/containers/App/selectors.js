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

export {
  selectGlobal,
  makeSelectError,
  makeSelectSuccess,
  makeSelectInfo,
  selectOpenApiSpecs,
};
