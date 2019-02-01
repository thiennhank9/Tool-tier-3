import React, { Component } from 'react';
import { Form, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import actions from './ManageUsersActions';
import Tier3Table from 'src/components/Tier3.Table';
import getColumns from 'src/data/TableManageUsersConfig';

const data = [
  {
    account: 'account 1',
    accessTool1: true,
    accessTool2: true
  },
  {
    account: 'account 2',
    accessTool1: true,
    accessTool2: false
  }
];

class ManageUsers extends Component {
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
    const { TITLE_MANAGE_USERS, ACCOUNT, ACCESS_TOOL_1, ACCESS_TOOL_2 } = this.props.globalStore.locales;
    return (
      <div className="container-manage-users">
        <center>
          <h5>{TITLE_MANAGE_USERS}</h5>
        </center>
        <Tier3Table data={data} columns={getColumns()} />
        {this.renderButtonsFooter()}
      </div>
    );
  }
}

export default compose(actions)(ManageUsers);
