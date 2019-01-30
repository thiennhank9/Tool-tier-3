import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class Tier3Table extends Component {
  render() {
    const { data, columns, defaultPageSize = 5, className = '' } = this.props;

    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={defaultPageSize}
        filterable
        style={{
          height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className={`-striped -highlight table ${className}`}
      />
    );
  }
}
