/**
 *
 * OpenApiSpecsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactJson from 'react-json-view';
import {
  globalSuccessMessage,
  globalErrorMessage,
  globalInfoMessage,
  requestSetOpenApiSpecs,
} from 'containers/App/actions';
import makeSelectOpenApiSpecsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectOpenApiSpecs, selectOpenApi } from '../App/selectors';
import OpenApiSpecInput from '../../components/OpenApiSpecInput';

export function OpenApiSpecsPage({
  specs,
  dispatchRequestSetOpenApiSpecs,
  api,
}) {
  useInjectReducer({ key: 'openApiSpecsPage', reducer });
  useInjectSaga({ key: 'openApiSpecsPage', saga });

  return (
    <div>
      {/* <h1>{JSON.stringify(specs)}</h1> */}
      {/* <ReactJson src={specs} enableClipboard={false} onEdit={false} /> */}
      <OpenApiSpecInput
        specs={specs}
        api={api}
        onConfirm={newSpecs => {
          dispatchRequestSetOpenApiSpecs(newSpecs);
        }}
      />
    </div>
  );
}

OpenApiSpecsPage.propTypes = {
  specs: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  api: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatchRequestSetOpenApiSpecs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  openApiSpecsPage: makeSelectOpenApiSpecsPage(),
  specs: selectOpenApiSpecs(),
  api: selectOpenApi(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestSetOpenApiSpecs(specs) {
      return dispatch(requestSetOpenApiSpecs(specs));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OpenApiSpecsPage);
