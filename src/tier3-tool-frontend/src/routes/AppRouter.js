import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import routesData, { paths } from '../data/RoutesData';
import HeaderNavbar from 'src/containers/HeaderNavbar';
import { Provider } from 'mobx-react';
import { merge } from 'lodash';

export class AppRouter extends Component {
  render() {
    const {
      globalStore: { isLogin }
    } = this.props;
    const globalStore = JSON.parse(localStorage.getItem('globalStorage'));

    return (
      <Router>
        <div>
          <Route
            key="/"
            exact
            path="/"
            render={props =>
              !isLogin ? (
                <Redirect
                  to={{
                    pathname: paths.LOGIN,
                    state: { from: props.location }
                  }}
                />
              ) : null
            }
          />
          {routesData.map((route, i) => (
            <Route
              key={route.path}
              path={route.path}
              render={props => (
                <Provider globalStore={merge(this.props.globalStore, globalStore)}>
                  <div>
                    {route.withNav ? <HeaderNavbar {...props} {...this.props} /> : null}
                    <route.component {...props} {...this.props} />
                  </div>
                </Provider>
              )}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default AppRouter;
