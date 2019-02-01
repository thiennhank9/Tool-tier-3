import React, { Component } from 'react';
import { Tabs, Tab, Badge, Button, Form } from 'react-bootstrap';

import TabKeys from 'src/data/TabsWarehouseKeys';
import { compose } from 'recompose';
import actions from './ToolWarehouseActions';
import WarehouseClients from './clients/WarehouseClients';
import WarehouseAuthorizations from './authorizations/WarehouseAuthorizations';

class ToolWarehouse extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: TabKeys.KEY_CLIENT
    };
  }
  render() {
    const {
      AUTHORIZATIONS,
      CLIENTS,
      CHANGE_CONNECTION,
      CONNECTED,
      CLICK_CHANGE_CONNECTION
    } = this.props.globalStore.locales;

    return (
      <div style={{ padding: 10 }}>
        <div>
          <span>
            {CONNECTED}:
            <Button style={{ marginLeft: 10 }} ariant="outline-success" onClick={this.props.onClickChangeConnection}>
              Connection name 1
            </Button>
            <span href="" style={{ marginLeft: 10 }}>
              ({CLICK_CHANGE_CONNECTION})
            </span>
          </span>
          <Form inline />
        </div>
        <div style={{ padding: 10 }}>
          <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
            <Tab eventKey={TabKeys.KEY_CLIENTS} title={CLIENTS}>
              <WarehouseClients globalStore={this.props.globalStore} />
            </Tab>
            <Tab eventKey={TabKeys.KEY_AUTHORIZATIONS} title={AUTHORIZATIONS}>
              <WarehouseAuthorizations globalStore={this.props.globalStore} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default compose(actions)(ToolWarehouse);
