import React, { Component } from 'react';
import getColumns from 'src/data/HHAXPatientsTableData';
import { observer } from 'mobx-react';
import { merge } from 'lodash';
import { resetScrollInsideTable, formatDateInTable } from 'src/utils/utils';
import TableForm from 'src/components/TableForm';

@observer
class HHAXPatientsTable extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(paging, instance) {
    if (!this.props.hhaxPatientsStore.isClickedSearch) {
      return;
    }
    const { connection } = this.props;

    this.props.hhaxPatientsStore.setPageSize(paging.pageSize);
    this.props.hhaxPatientsStore.getSearchPatients(connection, this.props);
    resetScrollInsideTable(0);
  }

  render() {
    const { totalRecords, patients, pageTotal, page, isLoading } = this.props.hhaxPatientsStore;

    return (
      <TableForm
        totalRecords={totalRecords}
        data={patients}
        pages={pageTotal}
        page={page}
        setPageSize={pageSize => this.props.hhaxPatientsStore.setPageSize(pageSize)}
        setPage={page => this.props.hhaxPatientsStore.setPage(page)}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              dischargeDate: formatDateInTable(row.dischargeDate),
              createdDate: formatDateInTable(row.createdDate),
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

export default HHAXPatientsTable;
