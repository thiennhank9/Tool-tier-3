import React, { Component } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './LoginActions';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';

@observer
class Login extends Component {
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }

  componentDidMount() {
    this.props.userStore.recoverRememberedLogin();
  }

  componentWillUnmount() {
    this.props.userStore.clearAll();
  }

  render() {
    const {
      TOOL_TIER3,
      USERNAME,
      USERNAME_PLACEHOLDER,
      PASSWORD,
      PASSWORD_PLACEHOLDER,
      LOGIN,
      LOGIN_FORM,
      REMEMBER_ME
    } = this.props.globalStore.locales;

    const { errorMessage, username, password } = this.props.userStore;

    return (
      <div className="container-screen-login">
        <center>
          <img src={require('src/imgs/sandata_icon.jpg')} style={{ width: 80, height: 80 }} alt="sandata-logo" />
        </center>
        <h1 className="text-center">{TOOL_TIER3}</h1>
        <Card className="container-card-login">
          <Card.Header className="card text-center">
            <h2>{LOGIN_FORM}</h2>
          </Card.Header>
          <Card.Body>
            <Form className="container-form" autoComplete="on">
              <Form.Group>
                <Form.Label size="md">{USERNAME}</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  value={username}
                  autoComplete="on"
                  placeholder={USERNAME_PLACEHOLDER}
                  onChange={this.props.handleChangeUsername}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label size="md">{PASSWORD}</Form.Label>
                <Form.Control
                  size="md"
                  type="password"
                  value={password}
                  autoComplete="on"
                  placeholder={PASSWORD_PLACEHOLDER}
                  onChange={this.props.handleChangePassword}
                />
              </Form.Group>
              <Form.Group>
                <div className="mb-3">
                  <Form.Check
                    custom
                    type="checkbox"
                    label={REMEMBER_ME}
                    id="99"
                    checked={this.props.userStore.isRemembered}
                    onChange={this.props.handleToggleRemember}
                  />
                </div>
              </Form.Group>
              <Button variant="primary" className="btn-block large-control" onClick={this.props.handleLogin} type="submit">
                {LOGIN}
              </Button>
            </Form>
          </Card.Body>
          {!isEmpty(errorMessage) && (
            <div className="container-error-message">
              <Alert variant="danger">
                <center>{errorMessage}</center>
              </Alert>
            </div>
          )}
          {this.props.globalStore.isTimeOut && (
            <div className="container-error-message">
              <Alert variant="danger">
                <center>Time out! Please login again!</center>
              </Alert>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default compose(actions)(Login);
