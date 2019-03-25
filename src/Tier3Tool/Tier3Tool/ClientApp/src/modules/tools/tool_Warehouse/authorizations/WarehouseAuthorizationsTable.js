import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsTableActions';
import getData from 'src/data/WarehouseAuthorizationsTableData';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import moment from 'moment';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

@observer
class WarehouseAuthorizationsTable extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(paging, instance) {
    if (!this.props.warehouseAuthorizationsStore.isClickedSearch) {
      return;
    }
    const { connection } = this.props;

    this.props.warehouseAuthorizationsStore.setPageSize(paging.pageSize);
    this.props.warehouseAuthorizationsStore.requestGetAuthorizationResults(connection, paging, this.props);
  }

  render() {
    return (
      <ReactTable
        sortable={false}
        manual // informs React Table that you'll be handling sorting and pagination server-side
        data={this.props.warehouseAuthorizationsStore.authorizationResults}
        pages={this.props.warehouseAuthorizationsStore.pageTotal}
        onPageSizeChange={pageSize => {
          this.props.warehouseAuthorizationsStore.setPageSize(pageSize);
        }}
        page={this.props.warehouseAuthorizationsStore.page}
        onPageChange={page => {
          this.props.warehouseAuthorizationsStore.setPage(page);
        }}
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
        defaultPageSize={PAGE_DEFAULTS.PAGE_SIZE}
        column={{
          ...ReactTableDefaults.column,
          headerStyle: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'left'
          }
        }}
        loading={this.props.warehouseAuthorizationsStore.isLoading}
        onFetchData={this.fetchData}
        // filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-highlight table"
      />
    );
  }
}

export default compose(actions)(WarehouseAuthorizationsTable);
