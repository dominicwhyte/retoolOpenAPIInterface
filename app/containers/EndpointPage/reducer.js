/*
 *
 * EndpointPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  MAKE_REQUEST,
  MAKE_REQUEST_ERROR,
  MAKE_REQUEST_SUCCESS,
  CLEAR_REQUEST_DATA,
} from './constants';

export const initialState = {
  requestLoading: false,
  requestResponse: false,
};

/* eslint-disable default-case, no-param-reassign */
const endpointPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MAKE_REQUEST:
        draft.requestLoading = true;
        break;
      case MAKE_REQUEST_ERROR:
        draft.requestLoading = false;
        break;
      case MAKE_REQUEST_SUCCESS:
        draft.requestLoading = false;
        draft.requestResponse = action.requestResponse;
        break;
      case CLEAR_REQUEST_DATA:
        draft.requestResponse = false;
        draft.requestLoading = false;
        break;
    }
  });

export default endpointPageReducer;
