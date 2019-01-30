import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './SelectToolActions';

class SelectTool extends Component {
  render() {
    const { CHOOSE_TOOL, TOOL_WAREHOUSE, TOOL_HHAX, MANAGE_CONNECTIONS, MANAGE_USERS } = this.props.globalStore.locales;

    return (
      <div>
        <div className="container-select-tool">
          <center className="margin-top">
            <h1>{CHOOSE_TOOL}</h1>
          </center>
          <div className="container-buttons-tools">
            <Button className="button-select-tool" variant="primary" type="submit" onClick={this.props.onClickTool1}>
              {TOOL_WAREHOUSE}
            </Button>
            <Button className="button-select-tool" variant="primary" type="submit" onClick={this.props.onClickTool2}>
              {TOOL_HHAX}
            </Button>
          </div>
          <div className="container-buttons-manages">
            <Button className="button-manage" variant="warning" type="submit" onClick={this.props.onClickManageUsers}>
              <span className="required"> * </span>
              {MANAGE_USERS}
            </Button>
            <Button
              className="button-manage"
              variant="warning"
              type="submit"
              onClick={this.props.onClickManageConnections}
            >
              <span className="required"> * </span>
              {MANAGE_CONNECTIONS}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(actions)(SelectTool);
