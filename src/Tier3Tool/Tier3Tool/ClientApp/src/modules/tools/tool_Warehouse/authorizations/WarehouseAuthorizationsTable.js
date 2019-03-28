import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsTableActions';
import getData from 'src/data/WarehouseAuthorizationsTableData';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import { resetScrollInsideTable, formatDateInTable } from 'src/utils/utils';
import TableForm from 'src/components/TableForm';

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
    resetScrollInsideTable(1);
  }

  render() {
    const { totalRecords, authorizationResults, pageTotal, page, isLoading } = this.props.warehouseAuthorizationsStore;

    return (
      <TableForm
        totalRecords={totalRecords}
        data={authorizationResults}
        pages={pageTotal}
        page={page}
        setPageSize={pageSize => this.props.warehouseAuthorizationsStore.setPageSize(pageSize)}
        setPage={page => this.props.warehouseAuthorizationsStore.setPage(page)}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              begin: formatDateInTable(row.begin),
              end: formatDateInTable(row.end),
              rowModified: formatDateInTable(row.rowModified),
              rowCreated: formatDateInTable(row.rowCreated),
              isProcessed: row.isProcessed.toString(),
              authShared: row.authShared.toString(),
              authVoided: row.authVoided.toString()
            });
          })
        }
        columns={getData(this.props.globalStore.locales)}
        loading={isLoading}
        onFetchData={this.fetchData}
      />
    );
  }
}

export default compose(actions)(WarehouseAuthorizationsTable);
