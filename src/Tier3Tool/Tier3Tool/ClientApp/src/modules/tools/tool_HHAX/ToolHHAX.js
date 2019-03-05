import React, { Component } from 'react';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';
import { get } from 'lodash';
import TabKeys from 'src/data/TabsHHAXKeys';
import HHAXAuthorizations from './authorizations/HHAXAuthorizations';
import HHAXPatients from './patients/HHAXPatients';
import actions from './ToolHHAXActions';
import { compose } from 'recompose';

class ToolHHAX extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: TabKeys.KEY_PATIENTS
    };
  }

  render() {
    const { AUTHORIZATIONS, PATIENTS, CONNECTED, SELECT_CONNECTIONS } = this.props.globalStore.locales;
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
            <Tabs id="controlled-tab-example-hhax" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
              <Tab eventKey={TabKeys.KEY_PATIENTS} title={PATIENTS}>
                <HHAXPatients
                  globalStore={this.props.globalStore}
                  connection={selectedConnection}
                />
              </Tab>
              <Tab eventKey={TabKeys.KEY_AUTHORIZATIONS} title={AUTHORIZATIONS}>
                <HHAXAuthorizations
                  globalStore={this.props.globalStore}
                  connection={selectedConnection}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
    );
  }
}

export default compose(actions)(ToolHHAX);
