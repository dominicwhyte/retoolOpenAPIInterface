/**
 *
 * OpenApiSpecsPage
 *
 */

import React, { useEffect } from 'react';
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
  setCredentials,
} from 'containers/App/actions';
import TagEndpointsGroup from 'components/TagEndpointsGroup';
import { clearRequestData } from 'containers/EndpointPage/actions';
import { Row, Col } from 'shards-react';
import makeSelectOpenApiSpecsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  selectOpenApiSpecs,
  selectOpenApi,
  selectCredentials,
} from '../App/selectors';
import OpenApiSpecInput from '../../components/OpenApiSpecInput';
import AuthorizationCard from '../../components/AuthorizationCard';

export function OpenApiSpecsPage({
  specs,
  dispatchRequestSetOpenApiSpecs,
  api,
  history,
  dispatchClearRequestData,
  credentials,
  dispatchSetCredentials,
}) {
  useInjectReducer({ key: 'openApiSpecsPage', reducer });
  useInjectSaga({ key: 'openApiSpecsPage', saga });

  useEffect(() => {
    dispatchClearRequestData();
  }, []);

  return (
    <div>
      <Row>
        {/* Editor */}
        <Col lg="6" md="12">
          <OpenApiSpecInput
            specs={specs}
            api={api}
            onConfirm={newSpecs => {
              dispatchRequestSetOpenApiSpecs(newSpecs);
            }}
          />
        </Col>

        {/* Sidebar Widgets */}
        {api.securityDefinitions && (
          <Col lg="6" md="12">
            <AuthorizationCard
              securityDefinitions={api.securityDefinitions}
              credentials={credentials}
              dispatchSetCredentials={dispatchSetCredentials}
            />
          </Col>
        )}
      </Row>

      {api && api.tags ? (
        <div>
          {api.tags.map((tag, idx) => (
            <div key={idx}>
              <TagEndpointsGroup
                paths={api.paths}
                tag={tag}
                onEndpointPressed={endpoint => {
                  history.push({
                    pathname: '/endpoint',
                    state: { endpoint },
                  });
                }}
              />
              <br />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

OpenApiSpecsPage.propTypes = {
  specs: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  api: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatchRequestSetOpenApiSpecs: PropTypes.func,
  dispatchClearRequestData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  openApiSpecsPage: makeSelectOpenApiSpecsPage(),
  specs: selectOpenApiSpecs(),
  api: selectOpenApi(),
  credentials: selectCredentials(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestSetOpenApiSpecs(specs) {
      return dispatch(requestSetOpenApiSpecs(specs));
    },
    dispatchClearRequestData() {
      return dispatch(clearRequestData());
    },
    dispatchSetCredentials(credential, securityDefinitionName) {
      return dispatch(setCredentials(credential, securityDefinitionName));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OpenApiSpecsPage);
