import InputLabel from 'app/bases/InputLabel';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './PopupAccountActions';

class PopupAccount extends Component {
  renderFormAccount() {
    const { USERNAME, PASSWORD, RE_PASSWORD, CAN_USE, TOOL_1, TOOL_2 } = this.props.global.locales;
    return (
      <Form>
        <InputLabel label={USERNAME} className="margin-top" />
        <InputLabel isPassword label={PASSWORD} className="margin-top" />
        <InputLabel isPassword label={RE_PASSWORD} className="margin-top" />
        <div className="container-checkboxs">
          <Form.Label className="label-center default-width-label">{CAN_USE}</Form.Label>
          <Form.Check /> <span>{TOOL_1}</span>
          <Form.Check /> <span>{TOOL_2}</span>
        </div>
      </Form>
    );
  }

  render() {
    const { POPUP_ACCOUNT, OK, CANCEL } = this.props.global.locales;

    return (
      <div className="container-popup-connection">
        <center>
          <h5>{POPUP_ACCOUNT}</h5>
        </center>
        <div className="container-form-databases">{this.renderFormAccount()}</div>
        <div className="container-form-databases width-buttons-footer-popup-account">
          <Button className="margin-top" variant="success" type="submit">
            {OK}
          </Button>
          <Button className="margin-top" variant="success" type="submit">
            {CANCEL}
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(actions)(PopupAccount);
