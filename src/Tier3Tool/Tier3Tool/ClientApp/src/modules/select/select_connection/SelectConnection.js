import React, { Component } from 'react';
import { compose } from 'recompose';
import { Button } from 'react-bootstrap';
import { isNil, forEach, isEmpty } from 'lodash';
import actions from './SelectConnectionActions';
import TOOL_TYPES from 'src/constants/ToolTypes.js';
import { observer } from 'mobx-react';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { paths } from 'src/data/RoutesData';

@observer
class SelectConnection extends Component {
  constructor(props, context) {
    super(props, context);
    // this.typeConnection = TOOL_TYPES.WAREHOUSE;
    this.state = {
      selectedIndex: 0,
      data: [],
      selectedRowInfo: {}
    };

    this.onRowClick = this.onRowClick.bind(this);
    this.handleClickConnectTool1 = this.handleClickConnectTool1.bind(this);
    this.handleClickConnectTool2 = this.handleClickConnectTool2.bind(this);
  }

  componentWillUnmount() {
    this.props.connectionStore.clearAll();
  }

  handleClickConnectTool1() {
    this.props.history.push({
      pathname: paths.TOOL_1,
      state: { selectedConnection: this.state.selectedRowInfo }
    });
  }

  handleClickConnectTool2() {
    this.props.history.push({
      pathname: paths.TOOL_2,
      state: { selectedConnection: this.state.selectedRowInfo }
    });
  }

  onRowClick(state, rowInfo, column, instance) {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: e => {
          if (rowInfo.index < this.state.data.length && !isEmpty(rowInfo.original)) {
            this.setState({
              selectedIndex: rowInfo.index,
              selectedRowInfo: rowInfo.original
            });
          }
        },
        onDoubleClick: e => {
          if (rowInfo.index < this.state.data.length && !isEmpty(rowInfo.original)) {
            const typeName = !isNil(this.props.location.state.typeName)
              ? this.props.location.state.typeName
              : this.props.typeName;
            if (typeName === TOOL_TYPES.WAREHOUSE) {
              this.props.history.push({
                pathname: paths.TOOL_1,
                state: { selectedConnection: this.state.selectedRowInfo }
              });
            }

            if (typeName === TOOL_TYPES.HHAX) {
              this.props.history.push({
                pathname: paths.TOOL_2,
                state: { selectedConnection: this.state.selectedRowInfo }
              });
            }
          }
        },
        style: {
          background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
          color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
        }
      };
    } else return {};
  }

  render() {
    const typeName = !isNil(this.props.location.state.typeName)
      ? this.props.location.state.typeName
      : this.props.typeName;
    this.typeConnection = typeName;
    const {
      locales: { CHOOSE_WAREHOUSE, CHOOSE_HHAX, CONNECT }
    } = this.props.globalStore;
    return (
      <div className="container-select-connection">
        <center className="margin-top">
          <h1>{typeName === TOOL_TYPES.WAREHOUSE ? CHOOSE_WAREHOUSE : CHOOSE_HHAX}</h1>
        </center>
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
        <Button
          className="button-connect"
          variant="success"
          type="submit"
          onClick={typeName === TOOL_TYPES.WAREHOUSE ? this.handleClickConnectTool1 : this.handleClickConnectTool2}
          disabled={isEmpty(this.state.data)}
        >
          {CONNECT}
        </Button>
        {/* {role === ROLES.ADMIN && <FooterManages {...this.props} />} */}
      </div>
    );
  }

  componentDidMount() {
    const typeName = !isNil(this.props.location.state.typeName)
      ? this.props.location.state.typeName
      : this.props.typeName;
    const typeConnection = typeName;

    const request =
      typeConnection === TOOL_TYPES.WAREHOUSE
        ? connectionRequest.getConnectionsWarehouse()
        : connectionRequest.getConnectionsHHAX();

    request
      .then(response => {
        let results = [];
        forEach(response.data, connection => {
          results.push(new Connection(connection));
        });
        this.setState({
          data: results,
          selectedRowInfo: isEmpty(results) ? {} : results[0]
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.globalStore.setLogout();
        }
      });
  }
}

export default compose(actions)(SelectConnection);
