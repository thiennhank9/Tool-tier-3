import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import TabKeys from 'src/data/TabsWarehouseKeys';

export default class ToolHHAXWarehouse extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: TabKeys.KEY_PATIENTS
    };
  }
  render() {
    const { AUTHORIZATIONS, PATIENTS } = this.props.globalStore.locales;

    return (
      <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
        <Tab eventKey={TabKeys.KEY_PATIENTS} title={PATIENTS}>
          <div>hello</div>
        </Tab>
        <Tab eventKey={TabKeys.KEY_AUTHORIZATIONS} title={AUTHORIZATIONS}>
          <div>hello</div>
        </Tab>
      </Tabs>
    );
  }
}
