import React, { Component } from 'react';
import { Button, Navbar, NavDropdown } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './HeaderNavbarActions';

class HeaderNavbar extends Component {
  render() {
    const { TOOLS, TOOL_1, TOOL_2, MANAGES, CONNECTIONS, USERS, LOGOUT } = this.props.globalStore.locales;

    return (
      <div className="container-nav-bar">
        <div className="container-nav-right">
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown className="nav-label" title={TOOLS}>
              <div className="nav-drop-down-container">
                <div>
                  <NavDropdown.Item className="nav-dropdown-item nav-drop-down-container" href="/tool-1">
                    {TOOL_1}
                  </NavDropdown.Item>
                </div>
                <div>
                  <NavDropdown.Item className="nav-dropdown-item nav-drop-down-container" href="/tool-2">
                    {TOOL_2}
                  </NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>
          </Navbar.Collapse>
          <NavDropdown className="nav-label" title={MANAGES}>
            <div className="nav-drop-down-container">
              <div>
                <NavDropdown.Item className="nav-dropdown-item nav-drop-down-container" href="/manage-users">
                  {USERS}
                </NavDropdown.Item>
              </div>
              <div>
                <NavDropdown.Item className="nav-dropdown-item nav-drop-down-container" href="/manage-connections">
                  {CONNECTIONS}
                </NavDropdown.Item>
              </div>
            </div>
          </NavDropdown>
        </div>
        <div class="container-nav-left">
          <Button onClick={this.props.onClickLogout}> {LOGOUT}</Button>
        </div>
      </div>
    );
  }
}

export default compose(actions)(HeaderNavbar);
