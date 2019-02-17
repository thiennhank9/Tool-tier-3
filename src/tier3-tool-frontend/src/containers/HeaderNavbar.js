import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './HeaderNavbarActions';
import { paths } from 'src/data/RoutesData';
import ROLES from 'src/constants/Roles.js';

class HeaderNavbar extends Component {
  render() {
    const {
      canAccessDW,
      canAccessHHAX,
      role,
      locales: { TOOLS, TOOL_1, TOOL_2, MANAGES, CONNECTIONS, USERS, LOGOUT, NO_PERMISSIONS }
    } = this.props.globalStore;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={TOOLS} id="basic-nav-dropdown">
              <NavDropdown.Item disabled={!canAccessDW} onClick={this.props.onClickTool1}>
                {`${TOOL_1} ${!canAccessDW ? `(${NO_PERMISSIONS})` : ''}`}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item disabled={!canAccessHHAX} onClick={this.props.onClickTool2}>
                {`${TOOL_2} ${!canAccessHHAX ? `(${NO_PERMISSIONS})` : ''}`}
              </NavDropdown.Item>
            </NavDropdown>
            {role === ROLES.ADMIN && (
              <NavDropdown title={MANAGES} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.props.onClickManageUsers}>{USERS}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.props.onClickManageConnections}>{CONNECTIONS}</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form inline>
            <Button variant="outline-success" onClick={this.props.onClickLogout}>
              {LOGOUT}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default compose(actions)(HeaderNavbar);
