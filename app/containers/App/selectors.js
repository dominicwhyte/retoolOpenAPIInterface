/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

// Note: this simply makes a selector that can be used to get a memoized version of the currentUser

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

// TODO: delete unnecessary ones

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

const makeSelectAppState = () =>
  createSelector(
    selectGlobal,
    substate => substate,
  );

export {
  selectGlobal,
  makeSelectError,
  makeSelectSuccess,
  makeSelectUser,
  makeSelectInfo,
  makeSelectLocation,
  selectOpenApiSpecs,
  makeSelectAppState,
};
