import React, { Component } from 'react';
import TOOL_TYPES from 'src/constants/ToolTypes.js';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { forEach, isEmpty } from 'lodash';
import { paths } from 'src/data/RoutesData';

export default class TableConnections extends Component {
  constructor(props, context) {
    super(props, context);
    this.typeConnection = TOOL_TYPES.WAREHOUSE;
    this.state = {
      selectedIndex: 0,
      data: [],
      selectedRowInfo: {}
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.handleClickConnect = this.handleClickConnect.bind(this);
  }

  onRowClick(state, rowInfo, column, instance) {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: e => {
          this.setState({
            selectedIndex: rowInfo.index,
            selectedRowInfo: rowInfo.original
          });
        },
        onDoubleClick: e => {
          this.props.history.push({
            pathname: paths.TOOL_1,
            state: { selectedConnection: this.state.selectedRowInfo }
          });
        },
        style: {
          background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
          color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
        }
      };
    } else return {};
  }

  render() {
    const typeName = this.props.typeName;
    return (
      <ReactTable
        data={this.state.data}
        columns={getColumns(typeName)}
        defaultPageSize={5}
        getTrProps={this.onRowClick}
        filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-highlight table"
      />
    );
  }

  componentDidMount() {
    const request =
      this.typeConnection === TOOL_TYPES.WAREHOUSE
        ? connectionRequest.getConnectionsWarehouse()
        : connectionRequest.getConnectionsHHAX();

    request.then(response => {
      let results = [];
      forEach(response.data, connection => {
        results.push(new Connection(connection));
      });
      this.setState({
        data: results,
        selectedRowInfo: isEmpty(this.state.data) ? {} : results[0]
      });
    });
  }
}
