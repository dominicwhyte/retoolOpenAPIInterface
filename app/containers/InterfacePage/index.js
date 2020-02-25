/**
 *
 * InterfacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInterfacePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function InterfacePage() {
  useInjectReducer({ key: 'interfacePage', reducer });
  useInjectSaga({ key: 'interfacePage', saga });

  return <div />;
}

InterfacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  interfacePage: makeSelectInterfacePage(),
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

export default compose(withConnect)(InterfacePage);
