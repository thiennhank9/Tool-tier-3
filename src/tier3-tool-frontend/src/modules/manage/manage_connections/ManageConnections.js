import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { compose } from 'recompose';
import TableConnections from 'src/components/TableConnections';
import actions from './ManageConnectionsActions';

class ManageConnections extends Component {
  renderButtonsFooter() {
    const { globalStore } = this.props;
    const { ADD, EDIT, REMOVE } = globalStore.locales;
    return (
      <div className="container-buttons-footer">
        <Button className="button-footer" variant="success" type="submit">
          {ADD}
        </Button>
        <Button className="button-footer" variant="success" type="submit">
          {EDIT}
        </Button>
        <Button className="button-footer" variant="success" type="submit">
          {REMOVE}
        </Button>
      </div>
    );
  }

  render() {
    const { globalStore } = this.props;
    const { CONNECTIONS, MANAGE_WAREHOUSE, MANAGE_HHAX } = globalStore.locales;

    return (
      <div className="container-manage-connections">
        <center>
          <h1>{CONNECTIONS}</h1>
        </center>
        <div className="container-tables">
          <div className="container-table">
            <center>
              <h1>{MANAGE_WAREHOUSE}</h1>
            </center>
            <TableConnections className="table" typeName="Warehouse" globalStore={globalStore} />
            {this.renderButtonsFooter()}
          </div>
          <div className="container-table">
            <center>
              <h1>{MANAGE_HHAX}</h1>
            </center>
            <TableConnections typeName="HHAX" globalStore={globalStore} />
            {this.renderButtonsFooter()}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(actions)(ManageConnections);
