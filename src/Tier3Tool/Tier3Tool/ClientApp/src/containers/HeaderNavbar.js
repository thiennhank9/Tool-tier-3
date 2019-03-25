import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import actions from './HeaderNavbarActions';
import ROLES from 'src/constants/Roles.js';

@observer
class HeaderNavbar extends Component {
  render() {
    const {
      canAccessDW,
      canAccessHHAX,
      role,
      locales: { TOOLS, WAREHOUSE, HHAX, MANAGES, CONNECTIONS, USERS, LOGOUT, NO_PERMISSIONS }
    } = this.props.globalStore;

    return (
      <Navbar bg="light" expand="sm" size="sm" className="fix-padding-container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown size="sm" title={TOOLS} id="basic-nav-dropdown">
              <NavDropdown.Item disabled={!canAccessDW} onClick={this.props.onClickTool1}>
                {`${WAREHOUSE} ${!canAccessDW ? `(${NO_PERMISSIONS})` : ''}`}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item disabled={!canAccessHHAX} onClick={this.props.onClickTool2}>
                {`${HHAX} ${!canAccessHHAX ? `(${NO_PERMISSIONS})` : ''}`}
              </NavDropdown.Item>
            </NavDropdown>
            {role === ROLES.ADMIN && (
              <NavDropdown size="sm" title={MANAGES} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.props.onClickManageUsers}>{USERS}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.props.onClickManageConnections}>{CONNECTIONS}</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form inline>
            <img
              src={require('src/imgs/sandata_icon.jpg')}
              style={{ width: 40, height: 40, marginRight: 15 }}
              alt="sandata-logo"
            />
            <span style={{ marginRight: 15, fontWeight: 'bold' }}>{this.props.globalStore.username}</span>
            <Button size="sm" variant="outline-success" onClick={this.props.onClickLogout}>
              {LOGOUT}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default compose(actions)(HeaderNavbar);
