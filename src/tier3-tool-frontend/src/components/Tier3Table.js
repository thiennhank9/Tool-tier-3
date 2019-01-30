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
        className={`-striped -highlight table ${className}`}
      />
    );
  }
}
