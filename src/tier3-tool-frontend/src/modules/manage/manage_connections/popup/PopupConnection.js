import InputLabel from 'app/bases/InputLabel';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './PopupConnectionActions';

class PopupConnection extends Component {
  renderFormDatabase() {
    const { SERVER_NAME, DATABASE_NAME, LOGIN_DB, PASSWORD_DB, CONNECTED } = this.props.global.locales;
    return (
      <Form>
        <InputLabel label={SERVER_NAME} className="margin-top" />
        <InputLabel label={DATABASE_NAME} className="margin-top" />
        <InputLabel label={LOGIN_DB} className="margin-top" />
        <InputLabel isPassword label={PASSWORD_DB} className="margin-top" />
        <div>
          {CONNECTED}
          <span class="icon-ok" />
        </div>
      </Form>
    );
  }

  render() {
    const { typeName, global } = this.props;
    const {
      POPUP_WAREHOUSE,
      POPUP_HHAX,
      ADMIN_DATABASE,
      WAREHOUSE_DATABASE,
      CONNECTION_NAME,
      TEST_CONNECTION,
      OK,
      CANCEL
    } = global.locales;
    const popupName = typeName === 'Warehouse' ? POPUP_WAREHOUSE : POPUP_HHAX;

    return (
      <div className="container-popup-connection">
        <center>
          <h5>{popupName}</h5>
        </center>
        <div>
          <InputLabel label={CONNECTION_NAME} className="container-connection-name margin-top" />
        </div>
        <div className="container-form-databases">
          <div>
            <center>
              <h1>{ADMIN_DATABASE}</h1>
            </center>
            {this.renderFormDatabase()}
          </div>
          <div>
            <center className="margin-top">
              <h1>{WAREHOUSE_DATABASE}</h1>
            </center>
            {this.renderFormDatabase()}
          </div>
        </div>
        <Button className="margin-top" variant="success" type="submit">
          {TEST_CONNECTION}
        </Button>
        <div className="container-form-databases width-buttons-footer">
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

export default compose(actions)(PopupConnection);
