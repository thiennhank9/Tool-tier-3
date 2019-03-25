import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import routesData, { paths } from '../data/RoutesData';
import HeaderNavbar from 'src/containers/HeaderNavbar';
import { Provider } from 'mobx-react';
import { isNil } from 'lodash';

@observer
class AppRouter extends Component {
  render() {
    const {
      globalStore: { isLogin }
    } = this.props;
    this.props.globalStore.getFromLocalStorage();

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
              render={props =>
                !isNil(localStorage.getItem('token')) || route.isPublic || isLogin ? (
                  <Provider globalStore={this.props.globalStore}>
                    <div>
                      {route.withNav ? <HeaderNavbar {...props} {...this.props} globalStore={this.props.globalStore} /> : null}
                      <route.component {...props} {...this.props} />
                    </div>
                  </Provider>
                ) : (
                  <Redirect
                    to={{
                      pathname: paths.LOGIN,
                      state: { from: props.location }
                    }}
                  />
                )
              }
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default AppRouter;
