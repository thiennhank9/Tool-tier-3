import React, { Component } from 'react';
import WarehouseAuthorizationsForm from './WarehouseAuthorizationsForm';
import WarehouseAuthorizationsTable from './WarehouseAuthorizationsTable';
import { observer } from 'mobx-react';
import { compose } from 'recompose';

import actions from './WarehouseAuthorizationsActions';

@observer
class WarehouseAuthorizations extends Component {
  render() {
    return (
      <div>
        <WarehouseAuthorizationsForm
          {...this.props}
          warehouseAuthorizationsStore={this.props.warehouseAuthorizationsStore}
          connection={this.props.connection}
        />
        <WarehouseAuthorizationsTable
          {...this.props}
          warehouseAuthorizationsStore={this.props.warehouseAuthorizationsStore}
          connection={this.props.connection}
        />
      </div>
    );
  }
}

export default compose(actions)(WarehouseAuthorizations);
