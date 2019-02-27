import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ROLES from 'src/constants/Roles.js';
import { paths } from 'src/data/RoutesData';

export default class FooterManages extends Component {
  constructor(props) {
    super(props);

    this.onClickManageUsers = this.onClickManageUsers.bind(this);
    this.onClickManageConnections = this.onClickManageConnections.bind(this);
  }

  onClickManageUsers() {
    this.props.history.push(paths.MANAGE_USERS);
  }
  onClickManageConnections() {
    this.props.history.push(paths.MANAGE_CONNECTIONS);
  }

  render() {
    const {
      role,
      locales: { MANAGE_CONNECTIONS, MANAGE_USERS }
    } = this.props.globalStore;

    return (
      <div>
        {role === ROLES.ADMIN && (
          <div className="container-buttons-manages">
            <Button className="button-manage" variant="warning" type="submit" onClick={this.onClickManageUsers}>
              <span className="required"> * </span>
              {MANAGE_USERS}
            </Button>
            <Button className="button-manage" variant="warning" type="submit" onClick={this.onClickManageConnections}>
              <span className="required"> * </span>
              {MANAGE_CONNECTIONS}
            </Button>
          </div>
        )}
      </div>
    );
  }
}
