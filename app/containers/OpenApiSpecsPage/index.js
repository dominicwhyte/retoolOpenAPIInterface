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
import makeSelectOpenApiSpecsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectOpenApiSpecs } from '../App/selectors';

export function OpenApiSpecsPage({ specs }) {
  useInjectReducer({ key: 'openApiSpecsPage', reducer });
  useInjectSaga({ key: 'openApiSpecsPage', saga });

  return (
    <div>
      {/* <h1>{JSON.stringify(specs)}</h1> */}
      {/* <ReactJson src={specs} enableClipboard={false} onEdit={false} /> */}
    </div>
  );
}

OpenApiSpecsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  specs: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  openApiSpecsPage: makeSelectOpenApiSpecsPage(),
  specs: selectOpenApiSpecs(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OpenApiSpecsPage);
