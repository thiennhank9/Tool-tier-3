import React, { Component } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './PopupConnectionActions';
import TOOL_TYPES from 'src/constants/ToolTypes';
import POPUP_TYPES from 'src/constants/PopupTypes';
import connectionsRequest from 'src/requests/ConnectionsRequest';
import { isEmpty, isNil } from 'lodash';

class PopupConnection extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: 0,
      connectionName: '',
      serverName: '',
      databaseName: '',
      login: '',
      password: '',
      errorMessage: '',
      connectionStatus: 'Not Connected'
    };

    this.handleConnectionName = this.handleConnectionName.bind(this);
    this.handleServerName = this.handleServerName.bind(this);
    this.handleDatabaseName = this.handleDatabaseName.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClickOk = this.handleClickOk.bind(this);
    this.validateConnectionFields = this.validateConnectionFields.bind(this);
    this.handleClickTestConnection = this.handleClickTestConnection.bind(this);
    this.getSelectedConnection = this.getSelectedConnection.bind(this);
  }

  validateConnectionFields() {
    const { connectionName, serverName, databaseName, login, password } = this.state;
    if (
      isEmpty(connectionName) ||
      isEmpty(serverName) ||
      isEmpty(databaseName) ||
      isEmpty(login) ||
      isEmpty(password)
    ) {
      return false;
    }
    return true;
  }

  getSelectedConnection() {
    if (!isNil(this.props.selectedConnection)) {
      const {
        id,
        connectionName,
        serverName,
        databaseName,
        databaseUsername,
        databasePassword
      } = this.props.selectedConnection;

      this.setState({
        id: id,
        connectionName: connectionName,
        serverName: serverName,
        databaseName: databaseName,
        login: databaseUsername,
        password: databasePassword
      });
    }
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

    if (!this.validateConnectionFields) {
      this.setState({
        errorMessage: 'Please enter full fields!'
      });
      return;
    }

    if (this.props.popupType === POPUP_TYPES.ADD) {
      if (this.state.connectionStatus === 'OK - Connected') {
        return connectionsRequest
          .addConnection(this.state, connectionType)
          .then(response => this.props.handleCloseWithRefresh())
          .catch(error => {
            if (error.response.status === 401) {
              this.props.globalStore.setLogout();
            } else {
              const {
                response: {
                  data: { message }
                }
              } = error;

              this.setState({ errorMessage: message });
            }
          });
      } else {
        this.setState({
          errorMessage: 'Please test connection!'
        });
      }
    }

    if (this.props.popupType === POPUP_TYPES.EDIT) {
      if (this.state.connectionStatus === 'OK - Connected') {
        return connectionsRequest
          .editConnection(this.state, connectionType)
          .then(response => this.props.handleCloseWithRefresh())
          .catch(error => {
            if (error.response.status === 401) {
              this.props.globalStore.setLogout();
            } else {
              const {
                response: {
                  data: { message }
                }
              } = error;

              this.setState({ errorMessage: message });
            }
          });
      } else {
        this.setState({
          errorMessage: 'Please test connection!'
        });
      }
    }
  }

  handleClickTestConnection() {
    this.setState({
      errorMessage: ''
    });

    if (!this.validateConnectionFields()) {
      this.setState({
        errorMessage: 'Please enter full fields!'
      });
      return true;
    }

    const { connectionType } = this.props;

    this.setState({
      connectionStatus: 'Validating connection'
    });

    return connectionsRequest
      .testConnection(this.state, connectionType)
      .then(response =>
        this.setState({
          connectionStatus: 'OK - Connected'
        })
      )
      .catch(error => {
        if (error.response.status === 401) {
          this.props.globalStore.setLogout();
        } else {
          this.setState({
            connectionStatus: 'ERROR - Not Connected'
          });
        }
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
          onChange={event => {
            this.setState({
              connectionStatus: 'Not Connected'
            });
            return onChange(event);
          }}
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
    const { TEST_CONNECTION, OK, CANCEL, ADD, EDIT, WAREHOUSE, HHAX } = globalStore.locales;
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
          <div className="container-test-connection">
            <Button variant="success" onClick={this.handleClickTestConnection}>
              {TEST_CONNECTION}
            </Button>
            <div>{this.state.connectionStatus}</div>
          </div>
          <div className="container-form-databases width-buttons-footer">
            <Button
              variant="success"
              disabled={this.state.connectionStatus !== 'OK - Connected'}
              onClick={this.handleClickOk}
            >
              {OK}
            </Button>
            <Button variant="success" onClick={this.props.handleCancel}>
              {CANCEL}
            </Button>
          </div>
        </Form>
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
      this.getSelectedConnection();
    }
  }
}

export default compose(actions)(PopupConnection);
