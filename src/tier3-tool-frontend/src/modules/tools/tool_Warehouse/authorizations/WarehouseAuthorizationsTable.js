import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsTableActions';
import getData from 'src/data/WarehouseAuthorizationsTableData';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import moment from 'moment';

@observer
class WarehouseAuthorizationsTable extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.warehouseAuthorizationsStore.authorizationResults}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              begin: moment(row.begin)
              .format('MM/DD/YYYY')
              .toString(),
              end: moment(row.end)
              .format('MM/DD/YYYY')
              .toString(),
              rowModified: moment(row.rowModified)
                .format('MM/DD/YYYY')
                .toString(),
              isProcessed: row.isProcessed.toString(),
              authShared: row.authShared.toString(),
              authVoided: row.authVoided.toString()
            });
          })
        }
        columns={getData(this.props.globalStore.locales)}
        defaultPageSize={5}
        column={{
          ...ReactTableDefaults.column,
          headerStyle: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        loading={this.props.warehouseAuthorizationsStore.isLoading}
        filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-highlight table"
      />
    );
  }
}

export default compose(actions)(WarehouseAuthorizationsTable);
