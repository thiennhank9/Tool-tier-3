import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './HeaderNavbarActions';
import { paths } from 'src/data/RoutesData';

class HeaderNavbar extends Component {
  render() {
    const { TOOLS, TOOL_1, TOOL_2, MANAGES, CONNECTIONS, USERS, LOGOUT } = this.props.globalStore.locales;
    
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={TOOLS} id="basic-nav-dropdown">
              <NavDropdown.Item href={paths.TOOL_1}>{TOOL_1}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={paths.TOOL_2}>{TOOL_2}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={MANAGES} id="basic-nav-dropdown">
              <NavDropdown.Item href={paths.MANAGE_USERS}>{USERS}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={paths.MANAGE_CONNECTIONS}>{CONNECTIONS}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <Button variant="outline-success" onClick={this.props.onClickLogout}>{LOGOUT}</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default compose(actions)(HeaderNavbar);
