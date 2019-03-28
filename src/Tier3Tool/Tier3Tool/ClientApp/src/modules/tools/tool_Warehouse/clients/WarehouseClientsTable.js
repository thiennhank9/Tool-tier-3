import React, { Component } from 'react';
import getColumns from 'src/data/WarehouseClientsTableData';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import { resetScrollInsideTable, formatDateInTable } from 'src/utils/utils';
import TableForm from 'src/components/TableForm';

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
    this.props.warehouseClientStore.requestGetClientResults(connection, paging, this.props);

    resetScrollInsideTable(0);
  }

  render() {
    const { totalRecords, clientResults, pageTotal, page, isLoading } = this.props.warehouseClientStore;

    return (
      <TableForm
        totalRecords={totalRecords}
        data={clientResults}
        pages={pageTotal}
        page={page}
        setPageSize={pageSize => this.props.warehouseClientStore.setPageSize(pageSize)}
        setPage={page => this.props.warehouseClientStore.setPage(page)}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              rowCreated: formatDateInTable(row.rowCreated),
              rowModified: formatDateInTable(row.rowModified),
              isProcessed: row.isProcessed.toString()
            });
          })
        }
        columns={getColumns(this.props.globalStore.locales)}
        loading={isLoading}
        onFetchData={this.fetchData}
      />
    );
  }
}

export default WarehouseClientsTable;
