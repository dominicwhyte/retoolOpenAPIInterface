/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const REQUEST_SET_OPEN_API_SPECS = 'app/REQUEST_SET_OPEN_API_SPECS';
export const SET_OPEN_API_SPECS = 'app/SET_OPEN_API_SPECS';
export const GLOBAL_ERROR_MESSAGE = 'app/GLOBAL_ERROR_MESSAGE';
export const GLOBAL_SUCCESS_MESSAGE = 'app/GLOBAL_SUCCESS_MESSAGE';
export const GLOBAL_INFO_MESSAGE = 'app/GLOBAL_INFO_MESSAGE';
export const SET_CREDENTIALS = 'app/SET_CREDENTIALS';
