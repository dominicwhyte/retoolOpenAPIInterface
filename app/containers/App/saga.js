/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import SwaggerParser from 'swagger-parser';
import { globalErrorMessage } from 'containers/App/actions';

import { REQUEST_SET_OPEN_API_SPECS } from './constants';

export function* setOpenApiSpecs({ specs }) {
  console.log('setOpenApiSpecs:');
  console.log(globalErrorMessage);
  yield put(globalErrorMessage('test'));
  // SwaggerParser.validate(specs, (err, api) => {

  //   if (err) {
  //     console.error(err);
  //     yield put(globalErrorMessage(String(error)));

  //   } else {
  //     console.log(
  //       'API name: %s, Version: %s',
  //       api.info.title,
  //       api.info.version,
  //     );
  //   }
  // });

  // const requestURL = `${serverURL}/holdings`;
  // try {
  //   // Call our request helper (see 'utils/request')
  //   const { holdings, headers } = yield call(request, requestURL, {});
  //   console.log(`GOT HOLDINGS: ${holdings.length}`);
  //   yield put(getHoldingsSuccess(holdings, headers)); // Username is then passed back and saved to the global state. So t
  // } catch (err) {
  //   console.log(`Got error in getHoldings: ${err}`);
  //   if (err.message === NOT_AUTHORIZED) {
  //     console.log('Not authorized! Sending notAuthorized action');
  //     yield put(getHoldingsError('Please log out'));
  //     // yield put(notAuthorized());
  //   } else {
  //     console.log(`Test: ${err.message}`);
  //     yield put(getHoldingsError(err.message));
  //   }
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(REQUEST_SET_OPEN_API_SPECS, setOpenApiSpecs);
}
