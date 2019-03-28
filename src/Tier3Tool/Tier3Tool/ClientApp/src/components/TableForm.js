import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { createTooltipTableColumns } from 'src/utils/utils';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

export default class TableForm extends Component {
  render() {
    const { totalRecords = 0, columns, setPageSize, setPage, ...restProps } = this.props;

    return (
      <div>
        <div>Total records: {totalRecords}</div>
        <ReactTable
          minRows={0}
          onPageSizeChange={pageSize => {
            setPageSize(pageSize);
            setPage(0);
          }}
          onPageChange={page => {
            setPage(page);
          }}
          sortable={false}
          manual // informs React Table that you'll be handling sorting and pagination server-side
          columns={createTooltipTableColumns(columns)}
          defaultPageSize={PAGE_DEFAULTS.PAGE_SIZE}
          column={{
            ...ReactTableDefaults.column,
            minWidth: 120,
            headerStyle: {
              backgroundColor: '#007bff',
              color: 'white',
              textAlign: 'left'
            }
          }}
          style={{
            height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight table"
          {...restProps}
        />
      </div>
    );
  }
}
