import React, { Component } from 'react';
import { compose } from 'recompose';
import { Form, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { isNil } from 'lodash';
import TableConnections from 'src/components/TableConnections';
import actions from './SelectConnectionActions';

class SelectConnection extends Component {
  render() {
    const typeName = !isNil(this.props.location.state.typeName)
      ? this.props.location.state.typeName // determine is pushed from tool's screen or from select-tool
      : this.props.typeName;
    const { CHOOSE_WAREHOUSE, CHOOSE_HHAX, CONNECT, MANAGE_CONNECTIONS, MANAGE_ACCOUNTS } = this.props.globalStore.locales;
    return (
      <div className="container-select-connection">
        <center className="margin-top">
          <h1>{typeName === 'Warehouse' ? CHOOSE_WAREHOUSE : CHOOSE_HHAX}</h1>
        </center>
        <TableConnections typeName={typeName} global={global} />
        <Button className="button-connect" variant="success" type="submit">
          {CONNECT}
        </Button>
        <div className="container-buttons-manages">
          <Button className="button-manage" variant="warning" type="submit">
            <span className="required"> * </span>
            {MANAGE_ACCOUNTS}
          </Button>
          <Button className="button-manage" variant="warning" type="submit">
            <span className="required"> * </span>
            {MANAGE_CONNECTIONS}
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(actions)(SelectConnection);
