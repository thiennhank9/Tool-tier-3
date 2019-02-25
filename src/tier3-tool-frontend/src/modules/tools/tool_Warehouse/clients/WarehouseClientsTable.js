import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseClientsTableActions';
import getColumns from 'src/data/WarehouseClientsTableConfig';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import moment from 'moment';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

@observer
class WarehouseClientsTable extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(paging, instance) {
    if (!this.props.warehouseClientStore.isClickedSearch) {
      return;
    }
    const { connection } = this.props;

    this.props.warehouseClientStore.setPageSize(paging.pageSize);
    this.props.warehouseClientStore.requestGetClientResults(connection, paging);
  }

  componentWillUnmount() {
    // this.props.warehouseClientStore.setClientResults([]);
  }

  render() {
    return (
      <ReactTable
        sortable={false}
        manual // informs React Table that you'll be handling sorting and pagination server-side
        data={this.props.warehouseClientStore.clientResults}
        pages={this.props.warehouseClientStore.pageTotal}
        onPageSizeChange={pageSize => {
          this.props.warehouseClientStore.setPageSize(pageSize);
        }}
        page={this.props.warehouseClientStore.page}
        onPageChange={page => {
          this.props.warehouseClientStore.setPage(page);
        }}
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
        defaultPageSize={PAGE_DEFAULTS.PAGE_SIZE}
        column={{
          ...ReactTableDefaults.column,
          headerStyle: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        loading={this.props.warehouseClientStore.isLoading}
        onFetchData={this.fetchData}
        // filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-striped -highlight table"
      />
    );
  }
}

export default compose(actions)(WarehouseClientsTable);
