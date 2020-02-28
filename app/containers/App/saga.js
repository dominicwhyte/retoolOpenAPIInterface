/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import SwaggerParser from 'swagger-parser';
import {
  globalErrorMessage,
  globalSuccessMessage,
  setOpenApiSpecs,
} from 'containers/App/actions';

import { REQUEST_SET_OPEN_API_SPECS } from './constants';

function validateSpecs(specs) {
  return new Promise((resolve, reject) => {
    SwaggerParser.validate(specs, (err, api) => {
      if (err) {
        return reject(err);
      }
      return resolve(api);
    });
  });
}

export function* setOpenApiSpecsSaga({ specs }) {
  try {
    const api = yield validateSpecs(specs);

    yield put(
      globalSuccessMessage(
        `Loaded OpenAPI ${api.info.title}, Version: ${api.info.version}`,
      ),
    );
    yield put(setOpenApiSpecs(api, specs));
  } catch (err) {
    yield put(globalErrorMessage(`${err}`));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(REQUEST_SET_OPEN_API_SPECS, setOpenApiSpecsSaga);
}
