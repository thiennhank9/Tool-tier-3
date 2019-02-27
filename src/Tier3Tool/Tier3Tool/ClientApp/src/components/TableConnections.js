import React, { Component } from 'react';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const dataWarehouse = [
  { connectionName: 'cn1', displayServerName: 'warehouse1' },
  { connectionName: 'cn2', displayServerName: 'warehouse2' },
  { connectionName: 'cn3', displayServerName: 'warehouse3' },
  { connectionName: 'cn4', displayServerName: 'warehouse4' },
  { connectionName: 'cn5', displayServerName: 'warehouse5' },
  { connectionName: 'cn6', displayServerName: 'warehouse6' }
];

const dataHHAX = [
  { connectionName: 'cn1', hhax: 'HHAX1' },
  { connectionName: 'cn2', hhax: 'HHAX2' },
  { connectionName: 'cn3', hhax: 'HHAX3' },
  { connectionName: 'cn4', hhax: 'HHAX4' },
  { connectionName: 'cn5', hhax: 'HHAX5' },
  { connectionName: 'cn6', hhax: 'HHAX6' }
];

@observer
class TableConnections extends Component {
  render() {
    const { typeName } = this.props;
    console.log(this.props.data);
    return (
      <ReactTable
        data={this.props.data}
        columns={getColumns(typeName)}
        defaultPageSize={5}
        getTrProps={this.props.onRowClick}
        filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-striped -highlight table"
      />
    );
  }
}

export default TableConnections;
