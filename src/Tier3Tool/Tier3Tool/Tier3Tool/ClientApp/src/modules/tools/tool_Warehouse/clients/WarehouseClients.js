import React, { Component } from 'react';
import WarehouseClientsForm from './WarehouseClientsForm';
import WarehouseClientsTable from './WarehouseClientsTable';
import { observer } from 'mobx-react';
import { compose } from 'recompose';

import actions from './WarehouseClientsActions';

@observer
class WarehouseClients extends Component {
  // constructor(props) {
  //   super(props)
  //   props.warehouseClientStore.resetAll();
  // }

  render() {
    return (
      <div>
        <WarehouseClientsForm
          {...this.props}
          warehouseClientStore={this.props.warehouseClientStore}
          connection={this.props.connection}
        />
        <WarehouseClientsTable
          {...this.props}
          warehouseClientStore={this.props.warehouseClientStore}
          connection={this.props.connection}
        />
      </div>
    );
  }

  componentWillUnmount() {
    this.props.warehouseClientStore.resetAll();
  }
}

export default compose(actions)(WarehouseClients);
