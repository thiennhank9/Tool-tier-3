import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
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
      <div className="container-screen-login">
        <h1 className="text-center">{TOOL_TIER3}</h1>
        <Card className="container-card-login">
          <Card.Header className="card text-center">
            <h2>{LOGIN_FORM}</h2>
          </Card.Header>
          <Card.Body>
            <Form className="container-form">
              <Form.Group>
                <Form.Label size="lg" className="large-label">
                  {USERNAME}
                </Form.Label>
                <Form.Control size="lg" className="large-control" type="text" placeholder={USERNAME_PLACEHOLDER} />
                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
              </Form.Group>

              <Form.Group>
                <Form.Label size="lg" className="large-label">
                  {PASSWORD}
                </Form.Label>
                <Form.Control size="lg" className="large-control" type="password" placeholder={PASSWORD_PLACEHOLDER} />
              </Form.Group>
              <Form.Group>
                <div className="mb-3">
                  <Form.Check custom type="checkbox" label={REMEMBER_ME} id="1" />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn-block large-control"
                onClick={this.props.onClickLogin}
              >
                {LOGIN}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default compose(actions)(Login);
