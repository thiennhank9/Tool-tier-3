import InputLabel from 'src/components/Tier3Input';
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './PopupConnectionActions';
import TOOL_TYPES from 'src/constants/ToolTypes';

class PopupConnection extends Component {
  renderFormDatabase() {
    const {
      SERVER_NAME,
      DATABASE_NAME,
      LOGIN_DB,
      PASSWORD_DB,
      CONNECTED,
      CONNECTION_NAME
    } = this.props.globalStore.locales;
    return (
      <Form>
        <InputLabel label={CONNECTION_NAME} />
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
    const { typeName, globalStore } = this.props;
    const {
      POPUP_WAREHOUSE,
      POPUP_HHAX,
      WAREHOUSE_DATABASE,
      CONNECTION_NAME,
      TEST_CONNECTION,
      OK,
      CANCEL,
      SERVER_NAME,
      DATABASE_NAME,
      LOGIN_DB,
      PASSWORD_DB,
      CONNECTED
    } = globalStore.locales;
    const popupName = typeName === TOOL_TYPES.WAREHOUSE ? POPUP_WAREHOUSE : POPUP_HHAX;

    return (
      <div className="container-popup-connection">
        <center>
          <h5>{popupName}</h5>
        </center>
        <Form>
          <InputLabel label={CONNECTION_NAME} />
          <InputLabel label={SERVER_NAME} className="margin-top" />
          <InputLabel label={DATABASE_NAME} className="margin-top" />
          <InputLabel label={LOGIN_DB} className="margin-top" />
          <InputLabel isPassword label={PASSWORD_DB} className="margin-top" />
          <div>
            {CONNECTED}
            <span class="icon-ok" />
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
        </Form>
      </div>
    );
  }
}

export default compose(actions)(PopupConnection);
