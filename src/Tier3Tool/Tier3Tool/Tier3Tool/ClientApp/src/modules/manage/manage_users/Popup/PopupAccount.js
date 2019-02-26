// import InputLabel from 'app/bases/InputLabel';
import React, { Component } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import { isEmpty } from 'lodash';
import actions from './PopupAccountActions';
import POPUP_TYPES from 'src/constants/PopupTypes';
import userRequest from 'src/requests/UserRequest';

class PopupAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      password: '',
      rePassword: '',
      canAccessDw: false,
      canAccessHhax: false,
      isAdmin: false,
      errorMessage: ''
    };

    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleToggleIsAdmin = this.handleToggleIsAdmin.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputRePassword = this.handleInputRePassword.bind(this);
    this.handleToggleDW = this.handleToggleDW.bind(this);
    this.handleToggleHHAX = this.handleToggleHHAX.bind(this);
    this.handleClickOk = this.handleClickOk.bind(this);
    this.validateRePassword = this.validateRePassword.bind(this);
    this.validateBlankFields = this.validateBlankFields.bind(this);
  }

  renderFormInput(label, value, onChange, isPassword = false) {
    return (
      <Form.Group key={label}>
        <Form.Label size="md">{label}</Form.Label>
        <Form.Control
          size="md"
          type={isPassword ? 'password' : 'text'}
          value={value}
          autoComplete="on"
          onChange={onChange}
        />
      </Form.Group>
    );
  }

  renderFormInputs() {
    const { USERNAME, PASSWORD, RE_PASSWORD } = this.props.globalStore.locales;

    const mapFormInputs = [
      { label: USERNAME, value: this.state.username, onChange: this.handleInputUsername },
      { label: PASSWORD, value: this.state.password, onChange: this.handleInputPassword, isPassword: true },
      { label: RE_PASSWORD, value: this.state.rePassword, onChange: this.handleInputRePassword, isPassword: true }
    ];

    return mapFormInputs.map(formInput => {
      return this.renderFormInput(formInput.label, formInput.value, formInput.onChange, formInput.isPassword);
    });
  }

  renderFormAccount() {
    const { CAN_USE, TOOL_1, TOOL_2, IS_ADMIN } = this.props.globalStore.locales;
    return (
      <Form>
        {this.renderFormInputs()}
        <Form.Group as={Row} style={{ display: 'flex', alignItems: 'center' }}>
          <Col sm={4}>
            <Form.Check
              size="sm"
              custom
              type="checkbox"
              label={IS_ADMIN}
              id="0"
              checked={this.state.isAdmin}
              onChange={this.handleToggleIsAdmin}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Label column size="sm" sm={4} className="label-center default-width-label">
            {CAN_USE}
          </Form.Label>
          <Col sm={4}>
            <Form.Check
              size="sm"
              custom
              type="checkbox"
              label={TOOL_1}
              id="1"
              checked={this.state.canAccessDw}
              onChange={this.handleToggleDW}
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              size="sm"
              custom
              type="checkbox"
              label={TOOL_2}
              id="2"
              checked={this.state.canAccessHhax}
              onChange={this.handleToggleHHAX}
            />
          </Col>
        </Form.Group>
      </Form>
    );
  }

  render() {
    const { OK, CANCEL } = this.props.globalStore.locales;
    const titlePopup = this.props.popupType === POPUP_TYPES.ADD ? 'Add User' : 'Edit User';
    return (
      <div className="container-popup-connection">
        <center>
          <h5>{titlePopup}</h5>
        </center>
        <div className="container-form-databases">{this.renderFormAccount()}</div>
        <div className="container-form-databases width-buttons-footer-popup-account">
          <Button variant="primary" onClick={this.handleClickOk}>
            {OK}
          </Button>
          <Button variant="primary" onClick={this.props.handleCancel}>
            {CANCEL}
          </Button>
        </div>
        {!isEmpty(this.state.errorMessage) && (
          <Alert variant="danger" className="text-center width-buttons-footer">
            {this.state.errorMessage}
          </Alert>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.popupType === POPUP_TYPES.EDIT) {
      const { id, username, password, isAdmin, canAccessDw, canAccessHhax } = this.props.selectedUser;
      this.setState({
        id: id,
        isAdmin: isAdmin,
        username: username,
        password: password,
        rePassword: password,
        canAccessDw: canAccessDw,
        canAccessHhax: canAccessHhax
      });
    }
  }

  handleInputUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleInputPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleInputRePassword(e) {
    this.setState({
      rePassword: e.target.value
    });
  }

  handleToggleIsAdmin() {
    this.setState(state => {
      return { isAdmin: !state.isAdmin };
    });
  }

  handleToggleDW() {
    this.setState(state => {
      return { canAccessDw: !state.canAccessDw };
    });
  }

  handleToggleHHAX() {
    this.setState(state => {
      return { canAccessHhax: !state.canAccessHhax };
    });
  }

  validateRePassword() {
    return this.state.password === this.state.rePassword;
  }

  validateBlankFields() {
    const { username, password, rePassword } = this.state;
    return !isEmpty(username) && !isEmpty(password) && !isEmpty(rePassword);
  }

  handleClickOk() {
    if (!this.validateBlankFields()) {
      this.setState({ errorMessage: 'Some fields are BLANK!' });
      return;
    }

    if (!this.validateRePassword()) {
      this.setState({ errorMessage: 'Password and Re-Password are not as same!' });
      return;
    }

    if (this.props.popupType === POPUP_TYPES.ADD) {
      userRequest
        .addUser(this.state)
        .then(response => this.props.handleCloseWithRefresh())
        .catch(error => {
          if (error.response.status === 401) {
            if (error.response.status === 401) {
              this.props.globalStore.setLogout();
            }
          } else {
            this.setState({
              errorMessage: error.response.data.message
            });
          }
        });
    }

    if (this.props.popupType === POPUP_TYPES.EDIT) {
      userRequest
        .editUser(this.state)
        .then(response => this.props.handleCloseWithRefresh())
        .catch(error => {
          if (error.response.status === 401) {
            this.props.globalStore.setLogout();
          } else {
            this.setState({
              errorMessage: error.response.data.message
            });
          }
        });
    }
  }
}

export default compose(actions)(PopupAccount);
