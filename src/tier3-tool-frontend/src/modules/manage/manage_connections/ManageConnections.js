import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { compose } from 'recompose';
import PopupConnections from './popup/PopupConnection';
import actions from './ManageConnectionsActions';
import ReactTable from 'react-table';
import getColumns from 'src/data/ColumnTableConnections';
import TOOL_TYPES from 'src/constants/ToolTypes';
import POPUP_TYPES from 'src/constants/PopupTypes';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { forEach, isEmpty } from 'lodash';

const DEFAULT_PAGE_SIZE = 10;
class ManageConnections extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      typePopupRemove: TOOL_TYPES.WAREHOUSE,
      showPopupConfirm: false,

      selectedIndexWarehouse: 0,
      dataWarehouse: [],
      selectedRowInfoWarehouse: {},

      selectedIndexHHAX: 0,
      dataHHAX: [],
      selectedRowInfoHHAX: {},

      show: false,
      connectionType: TOOL_TYPES.WAREHOUSE,
      popupType: POPUP_TYPES.ADD
    };

    this.onRowClickWarehouse = this.onRowClickWarehouse.bind(this);
    this.onRowClickHHAX = this.onRowClickHHAX.bind(this);
    this.onClickAddWarehouse = this.onClickAddWarehouse.bind(this);
    this.onClickEditWarehouse = this.onClickEditWarehouse.bind(this);
    this.onClickAddHHAX = this.onClickAddHHAX.bind(this);
    this.onClickEditHHAX = this.onClickEditHHAX.bind(this);
    this.onClickRemoveWarehouse = this.onClickRemoveWarehouse.bind(this);
    this.onClickOkRemoveWarehouse = this.onClickOkRemoveWarehouse.bind(this);
    this.onClickOkRemoveHHAX = this.onClickOkRemoveHHAX.bind(this);
    this.onClickRemoveHHAX = this.onClickRemoveHHAX.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseWithRefresh = this.handleCloseWithRefresh.bind(this);
    this.handleClosePopupConfirm = this.handleClosePopupConfirm.bind(this);
    this.handleOpenPopupConfirm = this.handleOpenPopupConfirm.bind(this);
  }

  handleClosePopupConfirm() {
    this.setState({
      showPopupConfirm: false
    });
  }

  handleOpenPopupConfirm() {
    this.setState({
      showPopupConfirm: true
    });
  }

  onClickRemoveWarehouse() {
    if (this.state.selectedRowInfoWarehouse === {}) {
      return;
    }
    this.setState({
      typePopupRemove: TOOL_TYPES.WAREHOUSE
    });
    this.handleOpenPopupConfirm();
  }

  onClickOkRemoveWarehouse() {
    connectionRequest
      .removeConnection(this.state.selectedRowInfoWarehouse, TOOL_TYPES.WAREHOUSE)
      .then(response => {
        this.handleClosePopupConfirm();
        this.requestGetConnections();
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClickRemoveHHAX() {
    if (this.state.selectedRowInfoHHAX === {}) {
      return;
    }
    this.setState({
      typePopupRemove: TOOL_TYPES.HHAX
    });
    this.handleOpenPopupConfirm();
  }

  onClickOkRemoveHHAX() {
    connectionRequest
      .removeConnection(this.state.selectedRowInfoHHAX, TOOL_TYPES.HHAX)
      .then(response => {
        this.handleClosePopupConfirm();
        this.requestGetConnections();
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  handleClose() {
    this.setState({ show: false });
    // this.requestGetConnections();
  }

  handleCloseWithRefresh() {
    this.setState({ show: false });
    this.requestGetConnections();
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

  onClickEditWarehouse() {
    this.setState({
      popupType: POPUP_TYPES.EDIT,
      connectionType: TOOL_TYPES.WAREHOUSE,
      show: true
    });
  }

  onClickEditHHAX() {
    this.setState({
      connectionType: TOOL_TYPES.HHAX,
      show: true,
      popupType: POPUP_TYPES.EDIT
    });
  }

  onClickAddWarehouse() {
    this.setState({
      connectionType: TOOL_TYPES.WAREHOUSE,
      show: true,
      popupType: POPUP_TYPES.ADD
    });
  }

  onClickAddHHAX() {
    this.setState({
      connectionType: TOOL_TYPES.HHAX,
      show: true,
      popupType: POPUP_TYPES.ADD
    });
  }

  renderButtonsFooter(typeConnection) {
    const { globalStore } = this.props;
    const { ADD, EDIT, REMOVE } = globalStore.locales;

    return (
      <div className="container-buttons-footer">
        <Button
          className="button-footer"
          variant="success"
          onClick={typeConnection === TOOL_TYPES.WAREHOUSE ? this.onClickAddWarehouse : this.onClickAddHHAX}
        >
          {ADD}
        </Button>
        <Button
          className="button-footer"
          variant="success"
          onClick={typeConnection === TOOL_TYPES.WAREHOUSE ? this.onClickEditWarehouse : this.onClickEditHHAX}
        >
          {EDIT}
        </Button>
        <Button
          className="button-footer"
          variant="success"
          onClick={typeConnection === TOOL_TYPES.WAREHOUSE ? this.onClickRemoveWarehouse : this.onClickRemoveHHAX}
        >
          {REMOVE}
        </Button>
      </div>
    );
  }

  renderPopup() {
    const { ADD, EDIT, CONNECTIONS } = this.props.globalStore.locales;
    const selectedConnection =
      this.state.popupType === EDIT
        ? this.state.connectionType === TOOL_TYPES.WAREHOUSE
          ? this.state.selectedRowInfoWarehouse
          : this.state.selectedRowInfoHHAX
        : null;
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        // {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{`${
            this.state.popupType === POPUP_TYPES.ADD ? ADD : EDIT
          } ${CONNECTIONS}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupConnections
            {...this.props}
            selectedConnection={selectedConnection}
            connectionType={this.state.connectionType}
            popupType={this.state.popupType}
            handleCloseWithRefresh={this.handleCloseWithRefresh}
            handleCancel={this.handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderPopupConfirmDelete() {
    const { CONFIRM_DELETE_CONNECTION, CONFIRMATION, YES, NO } = this.props.globalStore.locales;
    return (
      <Modal
        show={this.state.showPopupConfirm}
        onHide={this.handleClosePopupConfirm}
        // {...this.props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{CONFIRMATION}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{CONFIRM_DELETE_CONNECTION}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={
              this.state.typePopupRemove === TOOL_TYPES.WAREHOUSE
                ? this.onClickOkRemoveWarehouse
                : this.onClickOkRemoveHHAX
            }
          >
            {YES}
          </Button>
          <Button variant="danger" onClick={this.handleClosePopupConfirm}>
            {NO}
          </Button>
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
              <h3>{MANAGE_WAREHOUSE}</h3>
            </center>
            <ReactTable
              data={this.state.dataWarehouse}
              columns={getColumns(TOOL_TYPES.WAREHOUSE)}
              defaultPageSize={DEFAULT_PAGE_SIZE}
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
              <h3>{MANAGE_HHAX}</h3>
            </center>
            <ReactTable
              data={this.state.dataHHAX}
              columns={getColumns(TOOL_TYPES.HHAX)}
              defaultPageSize={DEFAULT_PAGE_SIZE}
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
        {this.state.show && this.renderPopup()}
        {this.state.showPopupConfirm && this.renderPopupConfirmDelete()}
      </div>
    );
  }

  componentDidMount() {
    this.requestGetConnections();
  }

  requestGetConnections() {
    connectionRequest.getConnections().then(response => {
      let warehouses = [];
      let hhaxs = [];

      forEach(response.data, connection => {
        if (connection.connectionType === TOOL_TYPES.WAREHOUSE) {
          warehouses.push(new Connection(connection));
        }
        if (connection.connectionType === TOOL_TYPES.HHAX) {
          hhaxs.push(new Connection(connection));
        }
      });

      this.setState({
        dataWarehouse: warehouses,
        dataHHAX: hhaxs,
        selectedRowInfoHHAX: !isEmpty(hhaxs) ? hhaxs[0] : {},
        selectedRowInfoWarehouse: !isEmpty(warehouses) ? warehouses[0] : {},
        selectedIndexWarehouse: 0,
        selectedIndexHHAX: 0
      });
    });
  }
}

export default compose(actions)(ManageConnections);
