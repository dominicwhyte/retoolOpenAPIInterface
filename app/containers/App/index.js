/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectSuccess,
  makeSelectError,
  makeSelectInfo,
  makeSelectAppState,
} from 'containers/App/selectors';

import { withRouter } from 'react-router';
import { useInjectReducer } from 'utils/injectReducer';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OpenApiSpecsPage from 'containers/OpenApiSpecsPage/Loadable';

import EndpointPage from 'containers/EndpointPage/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import ScrollToTop from './scrollToTop';
import reducer from './reducer';
import WithNavBar from '../../components/WithNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/main.scss';
import saga from './saga';
import {
  globalSuccessMessage,
  globalErrorMessage,
  globalInfoMessage,
  requestSetOpenApiSpecs,
} from './actions';

export function App({
  success,
  error,
  info,
  dispatchGlobalErrorMessage,
  dispatchGlobalInfoMessage,
  dispatchGlobalSuccessMessage,
  dispatchRequestSetOpenApiSpecs,
}) {
  useInjectSaga({ key: 'appPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });

  const demoOpenAPISpec = 'https://petstore.swagger.io/v2/swagger.json';
  useEffect(() => {
    dispatchRequestSetOpenApiSpecs(demoOpenAPISpec);
  }, []);

  // Notifications
  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
      dispatchGlobalErrorMessage(false);
    }
  }, [error]);

  useEffect(() => {
    if (info) {
      addToast(info, {
        appearance: 'info',
        autoDismiss: true,
      });
      dispatchGlobalInfoMessage(false);
    }
  }, [info]);

  useEffect(() => {
    if (success) {
      addToast(success, {
        appearance: 'success',
        autoDismiss: true,
      });
      dispatchGlobalSuccessMessage(false);
    }
  }, [success]);
  // End notifications

  return (
    <div>
      <ScrollToTop>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <WithNavBar title="Some Test" subtitle="Some Sub title">
                <OpenApiSpecsPage {...props} />
              </WithNavBar>
            )}
          />

          <Route
            exact
            path="/endpoint"
            render={props => <EndpointPage {...props} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </ScrollToTop>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGlobalSuccessMessage(success) {
      return dispatch(globalSuccessMessage(success));
    },
    dispatchGlobalErrorMessage(error) {
      return dispatch(globalErrorMessage(error));
    },
    dispatchGlobalInfoMessage(info) {
      return dispatch(globalInfoMessage(info));
    },
    dispatchRequestSetOpenApiSpecs(specs) {
      return dispatch(requestSetOpenApiSpecs(specs));
    },
  };
}

App.propTypes = {
  dispatchGlobalErrorMessage: PropTypes.func,
  dispatchGlobalSuccessMessage: PropTypes.func,
  dispatchGlobalInfoMessage: PropTypes.func,
  dispatchFetchSegment: PropTypes.func,
  dispatchRequestSetOpenApiSpecs: PropTypes.func,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  error: makeSelectError(),
  info: makeSelectInfo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(App));
