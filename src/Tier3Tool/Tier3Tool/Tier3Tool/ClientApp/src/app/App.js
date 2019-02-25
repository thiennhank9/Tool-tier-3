import React, { Component } from 'react';
import { compose } from 'recompose';
import 'react-table/react-table.css';

import AppRouter from '../routes/AppRouter';
import '../styles/index.scss';
import actions from './AppActions';

class App extends Component {
  render() {
    const globalStore = this.props.globalStore;
    return <AppRouter globalStore={globalStore} />;
  }
}

export default compose(actions)(App);
