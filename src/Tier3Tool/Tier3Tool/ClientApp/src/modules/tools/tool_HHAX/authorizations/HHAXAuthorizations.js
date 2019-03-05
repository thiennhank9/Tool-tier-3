import React, { Component } from "react";
import { compose } from "recompose";
import { observer } from "mobx-react";
import actions from "./HHAXAuthorizationsActions";
import HHAXAuthorizationsForm from "./HHAXAuthorizationsForm";
import HHAXAuthorizationsTable from "./HHAXAuthorizationsTable";

@observer
class HHAXAuthorizations extends Component {
  render() {
    return (
      <div>
        <HHAXAuthorizationsForm
          {...this.props}
          connection={this.props.connection}
          hhaxAuthorizationsStore={this.props.hhaxAuthorizationsStore}
        />
        <HHAXAuthorizationsTable
          {...this.props}
          connection={this.props.connection}
          hhaxAuthorizationsStore={this.props.hhaxAuthorizationsStore}
        />
      </div>
    );
  }

  componentWillUnmount() {
    this.props.hhaxAuthorizationsStore.resetAll();
  }
}

export default compose(actions)(HHAXAuthorizations);
