import React, { Component } from 'react';
import { Form, Button, Tabs, Tab } from 'react-bootstrap';
import { get, isEmpty } from 'lodash';
import TabKeys from 'src/data/TabsHHAXKeys';
import HHAXAuthorizations from './authorizations/HHAXAuthorizations';
import HHAXPatients from './patients/HHAXPatients';
import actions from './ToolHHAXActions';
import { compose } from 'recompose';
import hhaxRequest from 'src/requests/HHAXRequest';

class ToolHHAX extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: TabKeys.KEY_PATIENTS,
      transStatuses: ['']
    };
    this.requestGetTransStatuses = this.requestGetTransStatuses.bind(this);
  }

  requestGetTransStatuses() {
    const selectedConnection = get(this.props, 'location.state.selectedConnection', {});

    hhaxRequest
      .getTransStatuses(selectedConnection)
      .then(response => {
        let { data } = response;
        // Add the blank option
        data.unshift({
          statusID: null,
          statusDesc: null
        });

        this.setState({
          transStatuses: data
        });
      })
      .catch(error => {
        if (get(error, 'response.status', null) === 401) {
          this.props.globalStore.setLogout();
        }
      });
  }

  componentDidMount() {
    this.requestGetTransStatuses();
  }

  render() {
    const { AUTHORIZATIONS, PATIENTS, CONNECTED, CHANGE_CONNECTION } = this.props.globalStore.locales;
    const connectionName = get(this.props, 'location.state.selectedConnection.connectionName', 'BLANK');
    const selectedConnection = get(this.props, 'location.state.selectedConnection', {});

    const titleConnection = !isEmpty(selectedConnection)
      ? `${selectedConnection.serverName} - ${selectedConnection.databaseName}`
      : '';

    return (
      <div style={{ padding: 10 }}>
        <div>
          <Form inline>
            <span>{CONNECTED}:</span>
            <b style={{ margin: 10 }} variant="danger" title={titleConnection}>
              {connectionName}
            </b>
            <Button variant="primary" style={{ marginLeft: 10 }} onClick={this.props.onClickChangeConnection}>
              {CHANGE_CONNECTION}
            </Button>
          </Form>
        </div>
        <div style={{ padding: 10 }}>
          <Tabs id="controlled-tab-example-hhax" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
            <Tab eventKey={TabKeys.KEY_PATIENTS} title={PATIENTS}>
              <HHAXPatients globalStore={this.props.globalStore} connection={selectedConnection} transStatuses={this.state.transStatuses} />
            </Tab>
            <Tab eventKey={TabKeys.KEY_AUTHORIZATIONS} title={AUTHORIZATIONS}>
              <HHAXAuthorizations globalStore={this.props.globalStore} connection={selectedConnection} transStatuses={this.state.transStatuses}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default compose(actions)(ToolHHAX);
