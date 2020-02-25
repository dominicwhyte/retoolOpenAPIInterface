/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OpenApiSpecsPage from 'containers/OpenApiSpecsPage/Loadable';
import InterfacePage from 'containers/InterfacePage/Loadable';
import WithNavBar from '../../components/WithNavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/main.scss';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/interface"
          render={props => (
            <WithNavBar title="Some Test" subtitle="Some Sub title">
              <InterfacePage {...props} />
            </WithNavBar>
          )}
        />
        <Route
          exact
          path="/specs"
          render={props => (
            <WithNavBar title="Some Test" subtitle="Some Sub title">
              <OpenApiSpecsPage {...props} />
            </WithNavBar>
          )}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
