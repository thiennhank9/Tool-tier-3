import React, { Component } from 'react';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import actions from './HHAXPatientsActions';
import HHAXPatientsForm from './HHAXPatientsForm';
import HHAXPatientsTable from './HHAXPatientsTable';

@observer
class HHAXPatients extends Component {
  render() {
    return (
      <div>
        <HHAXPatientsForm
          {...this.props}
          connection={this.props.connection}
          hhaxPatientsStore={this.props.hhaxPatientsStore}
          transStatuses={this.props.transStatuses}
        />
        <HHAXPatientsTable
          {...this.props}
          connection={this.props.connection}
          hhaxPatientsStore={this.props.hhaxPatientsStore}
        />
      </div>
    );
  }

  componentWillUnmount() {
    this.props.hhaxPatientsStore.resetAll();
  }
}

export default compose(actions)(HHAXPatients);
