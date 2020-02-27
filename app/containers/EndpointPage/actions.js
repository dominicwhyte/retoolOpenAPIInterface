/*
 *
 * EndpointPage actions
 *
 */

import {
  DEFAULT_ACTION,
  MAKE_REQUEST,
  MAKE_REQUEST_SUCCESS,
  MAKE_REQUEST_ERROR,
  CLEAR_REQUEST_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function makeRequest(formInputs, endpoint) {
  return {
    type: MAKE_REQUEST,
    formInputs,
    endpoint,
  };
}

export function makeRequestSuccess(requestResponse) {
  return {
    type: MAKE_REQUEST_SUCCESS,
    requestResponse,
  };
}

export function clearRequestData() {
  return {
    type: MAKE_REQUEST_SUCCESS,
  };
}

export function makeRequestError() {
  return {
    type: CLEAR_REQUEST_DATA,
  };
}
