import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './LoginActions';

class Login extends Component {
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

    return (
      <div className="container-login">
        <center className="header-form">
          <h2>{LOGIN_FORM}</h2>
        </center>
        <Form className="container-form">
          <Form.Group>
            <Form.Label className="large-label">{USERNAME}</Form.Label>
            <Form.Control className="large-control" type="text" placeholder={USERNAME_PLACEHOLDER} />
            {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
          </Form.Group>

          <Form.Group>
            <Form.Label className="large-label">{PASSWORD}</Form.Label>
            <Form.Control className="large-control" type="password" placeholder={PASSWORD_PLACEHOLDER} />
          </Form.Group>
          <Form.Group>
            <Form.Check>
              <Form.Check.Input type="checkbox" />
              <Form.Check.Label className="label-checkbox">{REMEMBER_ME}</Form.Check.Label>
            </Form.Check>
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block large-control" onClick={this.props.onClickLogin}>
            {LOGIN}
          </Button>
        </Form>
      </div>
    );
  }
}

export default compose(actions)(Login);
