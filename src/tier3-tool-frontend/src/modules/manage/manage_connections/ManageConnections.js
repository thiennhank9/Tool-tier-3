import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { compose } from 'recompose';
import PopupConnections from './popup/PopupConnection';
import actions from './ManageConnectionsActions';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';
import TOOL_TYPES from 'src/constants/ToolTypes';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { forEach } from 'lodash';

class ManageConnections extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedIndexWarehouse: 0,
      dataWarehouse: [],
      selectedRowInfoWarehouse: {},

      selectedIndexHHAX: 0,
      dataHHAX: [],
      selectedRowInfoHHAX: {},

      show: false,
      typeName: TOOL_TYPES.WAREHOUSE
    };

    this.onRowClickWarehouse = this.onRowClickWarehouse.bind(this);
    this.onRowClickHHAX = this.onRowClickHHAX.bind(this);
    this.onClickEditWarehouse = this.onClickEditWarehouse.bind(this);
    this.onClickEditHHAX = this.onClickEditHHAX.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onRowClickWarehouse(state, rowInfo, column, instance) {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: e => {
          this.setState({
            selectedIndexWarehouse: rowInfo.index,
            selectedRowInfoWarehouse: rowInfo.original
          });
        },
        onDoubleClick: e => {
          this.onClickEditWarehouse();
        },
        style: {
          background: rowInfo.index === this.state.selectedIndexWarehouse ? '#00afec' : 'white',
          color: rowInfo.index === this.state.selectedIndexWarehouse ? 'white' : 'black'
        }
      };
    } else return {};
  }

  onRowClickHHAX(state, rowInfo, column, instance) {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: e => {
          this.setState({
            selectedIndexHHAX: rowInfo.index,
            selectedRowInfoHHAX: rowInfo.original
          });
        },
        onDoubleClick: e => {
          this.onClickEditHHAX();
        },
        style: {
          background: rowInfo.index === this.state.selectedIndexHHAX ? '#00afec' : 'white',
          color: rowInfo.index === this.state.selectedIndexHHAX ? 'white' : 'black'
        }
      };
    } else return {};
  }

  onClickEditWarehouse(){
    this.setState({
      typeName: TOOL_TYPES.WAREHOUSE,
      show: true
    })
  }

  onClickEditHHAX(){
    this.setState({
      typeName: TOOL_TYPES.HHAX,
      show: true
    })
  }

  renderButtonsFooter(typeConnection) {
    const { globalStore } = this.props;
    const { ADD, EDIT, REMOVE } = globalStore.locales;

    return (
      <div className="container-buttons-footer">
        <Button className="button-footer" variant="success" type="submit">
          {ADD}
        </Button>
        <Button className="button-footer" variant="success" type="submit" onClick={typeConnection === TOOL_TYPES.WAREHOUSE ? this.onClickEditWarehouse : this.onClickEditHHAX}>
          {EDIT}
        </Button>
        <Button className="button-footer" variant="success" type="submit">
          {REMOVE}
        </Button>
      </div>
    );
  }

  renderPopup() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add/Edit Connections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupConnections {...this.props} typeName={this.state.typeName} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { globalStore } = this.props;
    const { CONNECTIONS, MANAGE_WAREHOUSE, MANAGE_HHAX } = globalStore.locales;

    return (
      <div className="container-manage-connections">
        <center>
          <h1>{CONNECTIONS}</h1>
        </center>
        <div className="container-tables">
          <div className="container-table">
            <center>
              <h1>{MANAGE_WAREHOUSE}</h1>
            </center>
            <ReactTable
              data={this.state.dataWarehouse}
              columns={getColumns(TOOL_TYPES.WAREHOUSE)}
              defaultPageSize={5}
              getTrProps={this.onRowClickWarehouse}
              filterable
              style={{
                height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              className="-highlight table"
            />
            {this.renderButtonsFooter(TOOL_TYPES.WAREHOUSE)}
          </div>
          <div className="container-table">
            <center>
              <h1>{MANAGE_HHAX}</h1>
            </center>
            <ReactTable
              data={this.state.dataHHAX}
              columns={getColumns(TOOL_TYPES.HHAX)}
              defaultPageSize={5}
              getTrProps={this.onRowClickHHAX}
              filterable
              style={{
                height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              className="-highlight table"
            />
            {this.renderButtonsFooter(TOOL_TYPES.HHAX)}
          </div>
        </div>
        {this.renderPopup()}
      </div>
    );
  }

  componentDidMount() {
    connectionRequest.getConnections().then(response => {
      let warehouses = [];
      let hhaxs = [];

      forEach(response.data, connection => {
        if (connection.connectionType === TOOL_TYPES.WAREHOUSE) warehouses.push(new Connection(connection));
        if (connection.connectionType === TOOL_TYPES.HHAX) hhaxs.push(new Connection(connection));
      });

      this.setState({
        dataWarehouse: warehouses,
        dataHHAX: hhaxs
      });
    });
  }
}

export default compose(actions)(ManageConnections);
