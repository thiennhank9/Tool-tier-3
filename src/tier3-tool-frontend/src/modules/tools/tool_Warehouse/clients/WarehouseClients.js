import React, { Component } from 'react';
import WarehouseClientsForm from './WarehouseClientsForm';
import WarehouseClientsTable from './WarehouseClientsTable';

import { compose } from 'recompose';

import actions from './WarehouseClientsActions';

class WarehouseClients extends Component {
  render() {
    return (
      <div>
        <WarehouseClientsForm {...this.props} />
        <WarehouseClientsTable {...this.props}/>
      </div>
    );
  }
}

export default compose(actions)(WarehouseClients);
