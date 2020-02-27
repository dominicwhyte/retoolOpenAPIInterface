import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  globalErrorMessage,
  globalSuccessMessage,
} from 'containers/App/actions';

import { selectOpenApi } from 'containers/App/selectors';
import { MAKE_REQUEST } from './constants';
import { makeRequestError, makeRequestSuccess } from './actions';

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }

  return `${uri + separator + key}=${value}`;
}

function issueRequest(requestUrl, type, body, subPathDetails) {
  const bodyToUse = type.toUpperCase() !== 'GET' ? JSON.stringify(body) : null;
  console.log('requestUrl to use', requestUrl);
  console.log('bodyToUse', bodyToUse);

  return new Promise((resolve, reject) => {
    let responseStatus;

    let contentType = 'application/json'; // Default
    // In case we want a different MIME encoding
    if (subPathDetails.consumes && subPathDetails.consumes.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      contentType = subPathDetails.consumes[0];
    }

    fetch(requestUrl, {
      method: type.toUpperCase(),
      headers: {
        'Content-Type': contentType,
      },
      body: bodyToUse,
    })
      .then(function _(result) {
        console.log('yay', result);

        responseStatus = result.status;

        return result.text();
      })
      .then(function _(result) {
        console.log('SUCCESS');
        return resolve({ result, status: responseStatus });
      })
      .catch(function _(err) {
        console.log('err');
        return reject(err);
      });
  });
}

// Since we store everything as string because of form
// TODO: probably stop using forms (and the name field) and
// convert to right type immediately
function convertValueToRightType(type, value) {
  switch (type) {
    case 'integer':
      return Number(value);
    default:
      return value;
  }
}

// Note: in reality would want to use something like this
// https://github.com/swagger-api/swagger-ui/issues/1073
// for generating requests but instructions say not to use this library
function createRequestUrl(requestUrl, parameters, formInputs) {
  let finalRequestUrl = requestUrl;
  const body = {};

  parameters.forEach(function _(parameter) {
    const value = convertValueToRightType(
      parameter.type,
      formInputs[parameter.name],
    );

    if (value !== null) {
      switch (parameter.in) {
        case 'body':
          body[parameter.name] = value;
          break;
        case 'path':
          finalRequestUrl = finalRequestUrl.replace(
            `{${parameter.name}}`,
            value,
          );
          break;
        case 'query':
          finalRequestUrl = updateQueryStringParameter(
            finalRequestUrl,
            parameter.name,
            value,
          );
          break;
        case 'formData':
          break;
        default:
          console.log(`${parameter.in} not supported`);
          break;
      }
    }
  });
  return { requestUrl: finalRequestUrl, body };
}

export function* makeRequestSaga({ formInputs, endpoint }) {
  const { path, type, subPathDetails } = endpoint;

  const api = yield select(selectOpenApi());

  const { host, basePath } = api;
  const { requestUrl, body } = createRequestUrl(
    `https://${host}${basePath}${path}`,
    endpoint.subPathDetails.parameters,
    formInputs,
  );

  console.log('endpoint', endpoint);

  try {
    const { result, status } = yield issueRequest(
      requestUrl,
      type,
      body,
      subPathDetails,
    );

    console.log('result', result);
    console.log(status);

    yield put(globalSuccessMessage(`Request returned with status ${status}`));
    yield put(makeRequestSuccess({ result, status }));
  } catch (err) {
    yield put(globalErrorMessage(`${err}`));
    yield put(makeRequestError());
  }
}

// Individual exports for testing
export default function* endpointPageSaga() {
  yield takeLatest(MAKE_REQUEST, makeRequestSaga);
}
