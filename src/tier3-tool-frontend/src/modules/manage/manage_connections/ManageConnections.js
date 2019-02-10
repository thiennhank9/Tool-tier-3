import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { compose } from "recompose";
import TableConnections from "src/components/TableConnections";
import PopupConnections from "./popup/PopupConnection";
import actions from "./ManageConnectionsActions";

class ManageConnections extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onRowClick = this.onRowClick.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onRowClick(state, rowInfo, column, instance) {
    return {
      onDoubleClick: e => {
        this.handleShow();
      }
    };
  }

  renderButtonsFooter() {
    const { globalStore } = this.props;
    const { ADD, EDIT, REMOVE } = globalStore.locales;
    return (
      <div className="container-buttons-footer">
        <Button className="button-footer" variant="success" type="submit">
          {ADD}
        </Button>
        <Button className="button-footer" variant="success" type="submit">
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add/Edit Connections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupConnections {...this.props} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
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
            <TableConnections
              className="table"
              typeName="Warehouse"
              globalStore={globalStore}
              onRowClick={this.onRowClick}
            />
            {this.renderButtonsFooter()}
          </div>
          <div className="container-table">
            <center>
              <h1>{MANAGE_HHAX}</h1>
            </center>
            <TableConnections typeName="HHAX" globalStore={globalStore} />
            {this.renderButtonsFooter()}
          </div>
        </div>
        {this.renderPopup()}
      </div>
    );
  }
}

export default compose(actions)(ManageConnections);
