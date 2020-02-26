/**
 *
 * EndpointPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Row, Col } from 'shards-react';
import RunEndpointForm from 'components/RunEndpointForm';
import EndpointDetails from 'components/EndpointDetails';
import WithNavBar from '../../components/WithNavBar';
import makeSelectEndpointPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function EndpointPage({ location, history }) {
  useInjectReducer({ key: 'endpointPage', reducer });
  useInjectSaga({ key: 'endpointPage', saga });

  if (!location || !location.state || !location.state.endpoint) {
    history.push('/interface');
    return <div />;
  }
  const { endpoint } = location.state;
  console.log('endpoint');
  console.log(endpoint);
  return (
    <WithNavBar
      title={`${endpoint.type.toUpperCase()} ${endpoint.path}`}
      subtitle="Endpoint Details"
    >
      <Row noGutters>
        <Button theme="secondary" onClick={() => history.push('/interface')}>
          Back
        </Button>
      </Row>
      <br />
      <div>
        <Row>
          <Col lg="7" sm="12">
            <RunEndpointForm parameters={endpoint.subPathDetails.parameters} />
          </Col>

          <Col lg="5" sm="12">
            <EndpointDetails endpoint={endpoint} />
          </Col>
        </Row>
      </div>
    </WithNavBar>
  );
}

EndpointPage.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  endpointPage: makeSelectEndpointPage(),
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

export default compose(withConnect)(EndpointPage);
