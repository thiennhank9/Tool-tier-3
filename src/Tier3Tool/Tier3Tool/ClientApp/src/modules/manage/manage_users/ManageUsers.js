import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { compose } from 'recompose';

import actions from './ManageUsersActions';
import getColumns from 'src/data/TableManageUsersConfig';
import ReactTable from 'react-table';
import { observer } from 'mobx-react';
import POPUP_TYPES from 'src/constants/PopupTypes';
import PopupAccount from './Popup/PopupAccount';
import { isEmpty } from 'lodash';

const DEFAULT_PAGE_SIZE = 10;

@observer
class ManageUsers extends Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 0,
      popupType: POPUP_TYPES.ADD,
      show: false,
      showPopupConfirm: false
    };
    this.onRowClickUser = this.onRowClickUser.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onClickOkRemove = this.onClickOkRemove.bind(this);
    this.handleClosePopupConfirm = this.handleClosePopupConfirm.bind(this);
    this.handleCloseWithRefresh = this.handleCloseWithRefresh.bind(this);
  }

  componentWillUnmount() {
    this.props.manageUsersStore.clearAll();
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleCloseWithRefresh() {
    this.setState({
      show: false
    });

    this.props.manageUsersStore.requestGetUsers(this.props);
  }

  onClickAdd() {
    this.setState({
      popupType: POPUP_TYPES.ADD,
      show: true
    });
  }

  onClickEdit() {
    this.setState({
      popupType: POPUP_TYPES.EDIT,
      show: true
    });
  }
  onClickRemove() {
    this.setState({
      showPopupConfirm: true
    });
  }

  handleClosePopupConfirm() {
    this.setState({
      showPopupConfirm: false
    });
  }

  onClickOkRemove() {
    return this.props.manageUsersStore
      .requestDeleteUser(this.props)
      .then(response => {
        this.handleClosePopupConfirm();
        this.props.manageUsersStore.requestGetUsers(this.props);
      })
      .catch(error => console.log(error));
  }

  onRowClickUser(state, rowInfo, column, instance) {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: e => {
          this.props.manageUsersStore.setSelectedUser(rowInfo.original);
          this.setState({
            selectedIndex: rowInfo.index
          });
        },
        onDoubleClick: e => {
          this.setState({
            selectedIndex: rowInfo.index,
            popupType: POPUP_TYPES.EDIT,
            show: true
          });
        },
        style: {
          background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
          color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
        }
      };
    } else return {};
  }

  renderPopup() {
    const { ADD, EDIT } = this.props.globalStore.locales;
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
          } Users`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PopupAccount
            {...this.props}
            selectedUser={this.props.manageUsersStore.selectedUser}
            popupType={this.state.popupType}
            handleCloseWithRefresh={this.handleCloseWithRefresh}
            handleCancel={this.handleClose}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  renderPopupConfirmDelete() {
    const { CONFIRM_DELETE_USER, CONFIRMATION, YES, NO } = this.props.globalStore.locales;

    return (
      <Modal
        show={this.state.showPopupConfirm}
        onHide={this.handleClosePopupConfirm}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{CONFIRMATION}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{CONFIRM_DELETE_USER}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.onClickOkRemove}>
            {YES}
          </Button>
          <Button variant="danger" onClick={this.handleClosePopupConfirm}>
            {NO}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  renderButtonsFooter() {
    const { globalStore } = this.props;
    const { ADD, EDIT, REMOVE } = globalStore.locales;
    return (
      <div className="container-buttons-footer">
        <Button className="button-footer" variant="success" onClick={this.onClickAdd}>
          {ADD}
        </Button>
        <Button
          className="button-footer"
          variant="success"
          onClick={this.onClickEdit}
          disabled={isEmpty(this.props.manageUsersStore.selectedUser)}
        >
          {EDIT}
        </Button>
        <Button className="button-footer" variant="success" onClick={this.onClickRemove}>
          {REMOVE}
        </Button>
      </div>
    );
  }

  render() {
    const { TITLE_MANAGE_USERS } = this.props.globalStore.locales;
    const { manageUsersStore } = this.props;
    return (
      <div className="container-manage-users">
        <center>
          <h5>{TITLE_MANAGE_USERS}</h5>
        </center>
        <ReactTable
          data={manageUsersStore.users}
          columns={getColumns()}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          getTrProps={this.onRowClickUser}
          filterable
          style={{
            height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-highlight table"
        />
        {this.renderButtonsFooter()}
        {this.state.show && this.renderPopup()}
        {this.state.showPopupConfirm && this.renderPopupConfirmDelete()}
      </div>
    );
  }

  componentDidMount() {
    this.props.manageUsersStore.requestGetUsers(this.props);
  }
}

export default compose(actions)(ManageUsers);
