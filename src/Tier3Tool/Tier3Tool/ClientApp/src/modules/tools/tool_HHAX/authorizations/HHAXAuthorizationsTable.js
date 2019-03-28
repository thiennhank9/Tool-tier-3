import React, { Component } from 'react';
import getColumns from 'src/data/HHAXAuthorizationsTableData';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import { resetScrollInsideTable, formatDateInTable } from 'src/utils/utils';
import TableForm from 'src/components/TableForm';

@observer
class HHAXAuthorizationsTable extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(paging, instance) {
    if (!this.props.hhaxAuthorizationsStore.isClickedSearch) {
      return;
    }
    const { connection } = this.props;

    this.props.hhaxAuthorizationsStore.setPageSize(paging.pageSize);
    this.props.hhaxAuthorizationsStore.getSearchAuthorizations(connection, this.props);
    resetScrollInsideTable(1);
  }

  render() {
    const { totalRecords, authorizations, pageTotal, page, isLoading } = this.props.hhaxAuthorizationsStore;

    return (
      <TableForm
        totalRecords={totalRecords}
        data={authorizations}
        pages={pageTotal}
        page={page}
        setPageSize={pageSize => this.props.hhaxAuthorizationsStore.setPageSize(pageSize)}
        setPage={page => this.props.hhaxAuthorizationsStore.setPage(page)}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              authDateBegin: formatDateInTable(row.authDateBegin),
              authDateEnd: formatDateInTable(row.authDateEnd),
              modifiedDate: formatDateInTable(row.modifiedDate)
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

export default HHAXAuthorizationsTable;
