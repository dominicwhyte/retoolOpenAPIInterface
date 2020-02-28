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
import {
  SET_OPEN_API_SPECS,
  GLOBAL_ERROR_MESSAGE,
  GLOBAL_SUCCESS_MESSAGE,
  GLOBAL_INFO_MESSAGE,
  SET_CREDENTIALS,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  specs: false,
  api: false,
  error: false,
  info: false,
  success: false,
  credentials: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GLOBAL_SUCCESS_MESSAGE:
        draft.success = action.success;
        break;
      case GLOBAL_ERROR_MESSAGE:
        draft.error = action.error;
        break;
      case GLOBAL_INFO_MESSAGE:
        draft.info = action.info;
        break;
      case SET_OPEN_API_SPECS:
        draft.api = action.api;
        draft.specs = action.specs;
        break;
      case SET_CREDENTIALS:
        console.log('delta credentials');
        console.log(action.credential);
        draft.credentials[action.securityDefinitionName] = action.credential;
        console.log('NEW credentials');
        console.log(draft);
        break;
    }
  });

export default appReducer;
