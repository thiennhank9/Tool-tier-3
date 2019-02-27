import React, { Component } from 'react';
import { Tabs, Tab, Button, Form, Alert } from 'react-bootstrap';

import TabKeys from 'src/data/TabsWarehouseKeys';
import { compose } from 'recompose';
import actions from './ToolWarehouseActions';
import WarehouseClients from './clients/WarehouseClients';
import WarehouseAuthorizations from './authorizations/WarehouseAuthorizations';
import { get } from 'lodash';

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
      CONNECTED,
      CLICK_CHANGE_CONNECTION,
      SELECT_CONNECTIONS
    } = this.props.globalStore.locales;

    const connectionName = get(this.props, 'location.state.selectedConnection.connectionName', 'BLANK');
    const selectedConnection = get(this.props, 'location.state.selectedConnection', {});

    return (
      <div style={{ padding: 10 }}>
        <div>
          <Form inline>
            <span>{CONNECTED}:</span>
            <b style={{ margin: 10 }} variant="danger">
              {connectionName}
            </b>
            <Button variant="primary" style={{ marginLeft: 10 }} onClick={this.props.onClickChangeConnection}>
              {SELECT_CONNECTIONS}
            </Button>
          </Form>
        </div>
        <div style={{ padding: 10 }}>
          <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
            <Tab eventKey={TabKeys.KEY_CLIENTS} title={CLIENTS}>
              <WarehouseClients globalStore={this.props.globalStore} connection={selectedConnection} />
            </Tab>
            <Tab eventKey={TabKeys.KEY_AUTHORIZATIONS} title={AUTHORIZATIONS}>
              <WarehouseAuthorizations globalStore={this.props.globalStore} connection={selectedConnection} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default compose(actions)(ToolWarehouse);
