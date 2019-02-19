import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './PopupConnectionActions';
import TOOL_TYPES from 'src/constants/ToolTypes';
import POPUP_TYPES from 'src/constants/PopupTypes';
import connectionsRequest from 'src/requests/ConnectionsRequest';
import { isEmpty } from 'lodash';

class PopupConnection extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      connectionName: '',
      serverName: '',
      databaseName: '',
      login: '',
      password: '',
      errorMessage: ''
    };

    this.handleConnectionName = this.handleConnectionName.bind(this);
    this.handleServerName = this.handleServerName.bind(this);
    this.handleDatabaseName = this.handleDatabaseName.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClickOk = this.handleClickOk.bind(this);
    this.handleClickTestConnection = this.handleClickTestConnection.bind(this);
  }

  handleConnectionName(e) {
    this.setState({
      connectionName: e.target.value
    });
  }

  handleServerName(e) {
    this.setState({
      serverName: e.target.value
    });
  }

  handleDatabaseName(e) {
    this.setState({
      databaseName: e.target.value
    });
  }

  handleLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleClickOk(e) {
    const { connectionType } = this.props;
    return connectionsRequest
      .addConnection(this.state, connectionType)
      .then(response => console.log(response))
      .catch(error => {
        const {
          response: {
            data: { message }
          }
        } = error;

        this.setState({ errorMessage: message });
      });
  }

  handleClickTestConnection() {
    const { connectionType } = this.props;
    return connectionsRequest
      .testConnection(this.state, connectionType)
      .then(response => console.log(response))
      .catch(error => {
        console.log(error);
        // const {
        //   response: {
        //     data: { message }
        //   }
        // } = error;

        // this.setState({ errorMessage: message });
      });
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
    const { SERVER_NAME, DATABASE_NAME, LOGIN_DB, PASSWORD_DB, CONNECTION_NAME } = this.props.globalStore.locales;

    const mapFormInputs = [
      { label: CONNECTION_NAME, value: this.state.connectionName, onChange: this.handleConnectionName },
      { label: SERVER_NAME, value: this.state.serverName, onChange: this.handleServerName },
      { label: DATABASE_NAME, value: this.state.databaseName, onChange: this.handleDatabaseName },
      { label: LOGIN_DB, value: this.state.login, onChange: this.handleLogin },
      { label: PASSWORD_DB, value: this.state.password, onChange: this.handlePassword, isPassword: true }
    ];

    return mapFormInputs.map(formInput => {
      return this.renderFormInput(formInput.label, formInput.value, formInput.onChange, formInput.isPassword);
    });
  }

  render() {
    const { connectionType, globalStore, popupType } = this.props;
    const { TEST_CONNECTION, OK, CANCEL, CONNECTED, ADD, EDIT, WAREHOUSE, HHAX } = globalStore.locales;
    const popupName = `${popupType === POPUP_TYPES.ADD ? ADD : EDIT} ${
      connectionType === TOOL_TYPES.WAREHOUSE ? WAREHOUSE : HHAX
    }`;

    return (
      <div className="container-popup-connection">
        <center>
          <h5>{popupName}</h5>
        </center>
        <Form>
          {this.renderFormInputs()}
          <div>
            {CONNECTED}
            <span class="icon-ok" />
          </div>
          <Button className="margin-top" variant="success" onClick={this.handleClickTestConnection}>
            {TEST_CONNECTION}
          </Button>
          <div className="container-form-databases width-buttons-footer">
            <Button className="margin-top" variant="success" onClick={this.handleClickOk}>
              {OK}
            </Button>
            <Button className="margin-top" variant="success" onClick={this.props.handleCancel}>
              {CANCEL}
            </Button>
          </div>
        </Form>
        {!isEmpty(this.state.errorMessage) && (
          <Alert variant="danger" className="text-center">
            {this.state.errorMessage}
          </Alert>
        )}
      </div>
    );
  }
}

export default compose(actions)(PopupConnection);
