import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import actions from './SelectToolActions';
import ROLES from 'src/constants/Roles.js';
import FooterManages from 'src/containers/FooterManages';
import SelectConnectionButton from 'src/components/SelectConnectionButton';

@observer
class SelectTool extends Component {
  renderSelectConnectionButtons() {
    const {
      canAccessDW,
      canAccessHHAX,
      locales: { TOOL_WAREHOUSE, TOOL_HHAX, TOOL_1, TOOL_2 }
    } = this.props.globalStore;

    return (
      <Row className="container-buttons-tools">
        <SelectConnectionButton
          label1={TOOL_1}
          label2={TOOL_WAREHOUSE}
          canAccess={canAccessDW}
          onClick={this.props.onClickTool1}
        />
        <SelectConnectionButton
          label1={`(Not Available) ${TOOL_2}`}
          label2={TOOL_HHAX}
          canAccess={false}
          // canAccess={canAccessHHAX}
          // onClick={this.props.onClickTool2}
        />
      </Row>
    );
  }

  render() {
    const {
      role,
      locales: { CHOOSE_TOOL }
    } = this.props.globalStore;

    return (
      <div className="container-select-tool">
        <center className="margin-top">
          <h1>{CHOOSE_TOOL}</h1>
        </center>
        {this.renderSelectConnectionButtons()}
        {/* {role === ROLES.ADMIN && <FooterManages {...this.props} />} */}
      </div>
    );
  }
}

export default compose(actions)(SelectTool);
