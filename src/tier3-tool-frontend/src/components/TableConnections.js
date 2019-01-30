import React, { Component } from 'react';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';

const dataWarehouse = [
  { connectionName: 'cn1', admin: 'admin1', warehouse: 'warehouse1' },
  { connectionName: 'cn2', admin: 'admin2', warehouse: 'warehouse2' },
  { connectionName: 'cn3', admin: 'admin3', warehouse: 'warehouse3' },
  { connectionName: 'cn4', admin: 'admin4', warehouse: 'warehouse4' },
  { connectionName: 'cn5', admin: 'admin5', warehouse: 'warehouse5' },
  { connectionName: 'cn6', admin: 'admin6', warehouse: 'warehouse6' }
];

const dataHHAX = [
  { connectionName: 'cn1', admin: 'admin1', hhax: 'HHAX1' },
  { connectionName: 'cn2', admin: 'admin2', hhax: 'HHAX2' },
  { connectionName: 'cn3', admin: 'admin3', hhax: 'HHAX3' },
  { connectionName: 'cn4', admin: 'admin4', hhax: 'HHAX4' },
  { connectionName: 'cn5', admin: 'admin5', hhax: 'HHAX5' },
  { connectionName: 'cn6', admin: 'admin6', hhax: 'HHAX6' }
];

export default class TableConnections extends Component {
  render() {
    const { typeName } = this.props;

    return (
      <ReactTable
        data={typeName === 'Warehouse' ? dataWarehouse : dataHHAX}
        columns={getColumns(typeName)}
        defaultPageSize={5}
        className="-striped -highlight table"
      />
    );
  }
}
