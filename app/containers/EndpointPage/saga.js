import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  globalErrorMessage,
  globalSuccessMessage,
} from 'containers/App/actions';

import { selectOpenApi, selectCredentials } from 'containers/App/selectors';
import getSecurityCredentialsForEndpoint from 'utils/getSecurityCredentialsForEndpoint';
import isJsonString from '../../utils/isJsonString';

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

function issueRequest(
  requestUrl,
  type,
  body,
  subPathDetails,
  additionalHeaders,
) {
  const bodyToUse = type.toUpperCase() !== 'GET' ? JSON.stringify(body) : null;

  let contentType = 'application/json'; // Default
  // In case we want a different MIME encoding
  if (subPathDetails.consumes && subPathDetails.consumes.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    contentType = subPathDetails.consumes[0];
  }

  const headers = {
    'Content-Type': contentType,
    ...additionalHeaders,
  };
  console.log('requestUrl to use', requestUrl);
  console.log('bodyToUse');
  console.log(bodyToUse);
  console.log('headers', headers);

  return new Promise((resolve, reject) => {
    let responseStatus;

    fetch(requestUrl, {
      method: type.toUpperCase(),
      headers,
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
function convertValueToRightType(type, value, optionalSchemaType) {
  const isJsonSchemaType =
    optionalSchemaType === 'object' || optionalSchemaType === 'array';
  switch (type) {
    case 'integer':
      return Number(value);
    case undefined:
      if (isJsonSchemaType && isJsonString(value)) {
        return JSON.parse(value);
      }
      return value;
    default:
      return value;
  }
}

function addCredentials(requestUrl, body, headers, credentials, endpoint) {
  const additionalHeaders = headers;

  // Format is weird so had to do this to get which credentials should be used
  const credentialsToUse = getSecurityCredentialsForEndpoint(endpoint);

  Object.keys(credentials).forEach(function _(credentialKey) {
    const credential = credentials[credentialKey];
    if (credentialsToUse.includes(credential.name)) {
      switch (credential.type) {
        case 'apiKey':
          if (credential.in === 'header') {
            additionalHeaders[credential.name] = credential.value;
          }
          return null;
        default:
          return null;
      }
    }
  });

  return {
    requestUrl,
    body,
    additionalHeaders,
  };
}
// Note: in reality would want to use something like this
// https://github.com/swagger-api/swagger-ui/issues/1073
// for generating requests but instructions say not to use this library
function createRequest(
  requestUrl,
  parameters,
  formInputs,
  credentials,
  endpoint,
) {
  let finalRequestUrl = requestUrl;
  let body = {};
  const additionalHeaders = {};

  parameters.forEach(function _(parameter) {
    const value = convertValueToRightType(
      parameter.type,
      formInputs[parameter.name],
      parameter.schema ? parameter.schema.type : undefined,
    );

    if (value !== null) {
      switch (parameter.in) {
        case 'body':
          // This is how swagger seems to do it. Not naming individual fields in body
          if (parameter.name === 'body') {
            body = value;
          } else {
            body[parameter.name] = value;
          }
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
        case 'header':
          additionalHeaders[parameter.name] = value;
          break;
        default:
          console.log(`${parameter.in} not supported`);
          break;
      }
    }
  });

  return addCredentials(
    finalRequestUrl,
    body,
    additionalHeaders,
    credentials,
    endpoint,
  );
}

export function* makeRequestSaga({ formInputs, endpoint }) {
  const { path, type, subPathDetails } = endpoint;

  const api = yield select(selectOpenApi());
  const credentials = yield select(selectCredentials());

  const { host, basePath } = api;
  const { requestUrl, body, additionalHeaders } = createRequest(
    `https://${host}${basePath}${path}`,
    endpoint.subPathDetails.parameters,
    formInputs,
    credentials,
    endpoint,
  );

  try {
    const { result, status } = yield issueRequest(
      requestUrl,
      type,
      body,
      subPathDetails,
      additionalHeaders,
    );

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
