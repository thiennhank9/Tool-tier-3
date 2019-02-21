import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseClientsTableActions';
import getColumns from 'src/data/WarehouseClientsTableConfig';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import moment from 'moment';

@observer
class WarehouseClientsTable extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.warehouseClientStore.clientResults}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              rowCreated: moment(row.rowCreated)
                .format('MM/DD/YYYY')
                .toString(),
              rowModified: moment(row.rowModified)
                .format('MM/DD/YYYY')
                .toString(),
              isProcessed: row.isProcessed.toString()
            });
          })
        }
        columns={getColumns(this.props.globalStore.locales)}
        defaultPageSize={5}
        column={{
          ...ReactTableDefaults.column,
          headerStyle: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        loading={this.props.warehouseClientStore.isLoading}
        filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-highlight table"
      />
    );
  }

}

export default compose(actions)(WarehouseClientsTable);
