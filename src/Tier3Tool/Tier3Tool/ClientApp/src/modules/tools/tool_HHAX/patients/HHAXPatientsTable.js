import React, { Component } from 'react';
import getColumns from 'src/data/HHAXPatientsTableData';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { observer } from 'mobx-react';
import { merge, isNil } from 'lodash';
import moment from 'moment';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

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
  }

  render() {
    return (
      <ReactTable
        sortable={false}
        manual // informs React Table that you'll be handling sorting and pagination server-side
        data={this.props.hhaxPatientsStore.patients}
        pages={this.props.hhaxPatientsStore.pageTotal}
        onPageSizeChange={pageSize => {
          this.props.hhaxPatientsStore.setPageSize(pageSize);
        }}
        page={this.props.hhaxPatientsStore.page}
        onPageChange={page => {
          this.props.hhaxPatientsStore.setPage(page);
        }}
        resolveData={data =>
          data.map(row => {
            return merge(row, {
              dischargeDate: isNil(row.dischargeDate)
                ? null
                : moment(row.dischargeDate)
                    .format('MM/DD/YYYY')
                    .toString(),
              createdDate: isNil(row.createdDate)
                ? null
                : moment(row.createdDate)
                    .format('MM/DD/YYYY')
                    .toString(),
              modifiedDate: isNil(row.modifiedDate)
                ? null
                : moment(row.modifiedDate)
                    .format('MM/DD/YYYY')
                    .toString()
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
            fontWeight: 'bold',
            textAlign: 'left'
          }
        }}
        loading={this.props.hhaxPatientsStore.isLoading}
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

export default HHAXPatientsTable;
