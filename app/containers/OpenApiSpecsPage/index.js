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
import { selectOpenApiSpecs } from '../App/selectors';
import OpenApiSpecInput from '../../components/OpenApiSpecInput';

export function OpenApiSpecsPage({ specs, dispatchRequestSetOpenApiSpecs }) {
  useInjectReducer({ key: 'openApiSpecsPage', reducer });
  useInjectSaga({ key: 'openApiSpecsPage', saga });

  return (
    <div>
      {/* <h1>{JSON.stringify(specs)}</h1> */}
      {/* <ReactJson src={specs} enableClipboard={false} onEdit={false} /> */}
      <OpenApiSpecInput
        originalSpecs={JSON.stringify(specs)}
        onConfirm={newSpecs => {
          console.log('confirm');
          // dispatchGlobalSuccessMessage('Yay!');
          dispatchRequestSetOpenApiSpecs(newSpecs);
        }}
      />
    </div>
  );
}

OpenApiSpecsPage.propTypes = {
  specs: PropTypes.object,
  dispatchRequestSetOpenApiSpecs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  openApiSpecsPage: makeSelectOpenApiSpecsPage(),
  specs: selectOpenApiSpecs(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestSetOpenApiSpecs(specs) {
      console.log('test');
      return dispatch(requestSetOpenApiSpecs(specs));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OpenApiSpecsPage);
