import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './SelectToolActions';
import ROLES from 'src/constants/Roles.js';
import FooterManages from 'src/containers/FooterManages';

class SelectTool extends Component {
  render() {
    const {
      canAccessDW,
      canAccessHHAX,
      role,
      locales: { CHOOSE_TOOL, TOOL_WAREHOUSE, TOOL_HHAX }
    } = this.props.globalStore;

    return (
      <div>
        <div className="container-select-tool">
          <center className="margin-top">
            <h1>{CHOOSE_TOOL}</h1>
          </center>
          <div className="container-buttons-tools">
            <Button
              className="button-select-tool"
              variant={canAccessDW ? 'primary' : 'light'}
              type="submit"
              onClick={this.props.onClickTool1}
              disabled={!canAccessDW}
            >
              {TOOL_WAREHOUSE}
            </Button>
            <Button
              className="button-select-tool"
              variant={canAccessHHAX ? 'primary' : 'light'}
              type="submit"
              onClick={this.props.onClickTool2}
              disabled={!canAccessHHAX}
            >
              {TOOL_HHAX}
            </Button>
          </div>
          {role === ROLES.ADMIN && <FooterManages {...this.props} />}
        </div>
      </div>
    );
  }
}

export default compose(actions)(SelectTool);
