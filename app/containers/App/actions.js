/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GLOBAL_SUCCESS_MESSAGE,
  GLOBAL_ERROR_MESSAGE,
  GLOBAL_INFO_MESSAGE,
  REQUEST_SET_OPEN_API_SPECS,
  SET_OPEN_API_SPECS,
  SET_CREDENTIALS,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */

export function globalSuccessMessage(success) {
  return {
    type: GLOBAL_SUCCESS_MESSAGE,
    success,
  };
}

export function globalInfoMessage(info) {
  return {
    type: GLOBAL_INFO_MESSAGE,
    info,
  };
}

export function globalErrorMessage(error) {
  return {
    type: GLOBAL_ERROR_MESSAGE,
    error,
  };
}

export function requestSetOpenApiSpecs(specs) {
  return {
    type: REQUEST_SET_OPEN_API_SPECS,
    specs,
  };
}

export function setOpenApiSpecs(api, specs) {
  return {
    type: SET_OPEN_API_SPECS,
    api,
    specs,
  };
}

export function setCredentials(credential, securityDefinitionName) {
  return {
    type: SET_CREDENTIALS,
    credential,
    securityDefinitionName,
  };
}
