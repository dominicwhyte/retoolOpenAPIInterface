/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

// Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but
// don't describe how the application's state changes.

import produce from 'immer';
import { SET_OPEN_API_SPECS } from './constants';

import demoOpenAPISpecs from '../../data/demoOpenAPISpecs';

// The initial state of the App
export const initialState = {
  loading: false,
  specs: demoOpenAPISpecs,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_OPEN_API_SPECS:
        draft.specs = action.specs;
        break;
    }
  });

export default appReducer;
