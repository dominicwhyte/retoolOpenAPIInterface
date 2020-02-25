/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectOpenApiSpecs = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.specs,
  );

export { selectGlobal, selectOpenApiSpecs };
