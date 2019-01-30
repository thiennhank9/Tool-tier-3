import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import routesData, { paths } from '../data/RoutesData';
import HeaderNavbar from 'src/containers/HeaderNavbar';

function RouteWithNavbar(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default class AppRouter extends Component {
  render() {
    const isLogin = this.props.globalStore.isLogin;

    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props =>
              !isLogin ? <Redirect to={{ pathname: paths.LOGIN, state: { from: props.location } }} /> : null
            }
          />
          {routesData.map((route, i) => (
            <Route
              path={route.path}
              render={props => (
                <div>
                  {route.withNav ? <HeaderNavbar {...props} {...this.props} /> : null}
                  <route.component {...props} {...this.props} />
                </div>
              )}
            />
          ))}
        </div>
      </Router>
    );
  }
}
