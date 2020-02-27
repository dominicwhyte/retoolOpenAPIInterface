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
import makeSelectEndpointPage, {
  selectRequestResponse,
  selectRequestLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeRequest } from './actions';

export function EndpointPage({
  location,
  history,
  dispatchRequestSetOpenApiSpecs,
  requestResponse,
  requestLoading,
}) {
  useInjectReducer({ key: 'endpointPage', reducer });
  useInjectSaga({ key: 'endpointPage', saga });

  if (!location || !location.state || !location.state.endpoint) {
    history.push('/');
    return <div />;
  }
  const { endpoint } = location.state;

  return (
    <WithNavBar
      title={`${endpoint.type.toUpperCase()} ${endpoint.path}`}
      subtitle="Endpoint Details"
    >
      <Row noGutters>
        <Button theme="secondary" onClick={() => history.push('/')}>
          Back
        </Button>
      </Row>
      <br />
      <div>
        <Row>
          <Col lg="7" sm="12">
            <RunEndpointForm
              parameters={endpoint.subPathDetails.parameters}
              requestResponse={requestResponse}
              requestLoading={requestLoading}
              onExecuteEndpoint={event => {
                const formInputs = {};
                for (let i = 0; i < event.target.length; i += 1) {
                  const target = event.target[i];
                  if (target.name !== '') {
                    formInputs[target.name] = target.value;
                  }
                }
                dispatchRequestSetOpenApiSpecs(formInputs, endpoint);
                event.preventDefault();
                // return false;
              }}
            />
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
  dispatchRequestSetOpenApiSpecs: PropTypes.func,
  requestResponse: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  endpointPage: makeSelectEndpointPage(),
  requestResponse: selectRequestResponse(),
  requestLoading: selectRequestLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestSetOpenApiSpecs(formInputs, endpoint) {
      return dispatch(makeRequest(formInputs, endpoint));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EndpointPage);
