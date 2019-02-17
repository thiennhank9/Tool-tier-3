import React, { Component } from "react";
import { compose } from "recompose";
import { Button } from "react-bootstrap";
import { isNil, forEach, isEmpty } from "lodash";
import actions from "./SelectConnectionActions";
import TOOL_TYPES from "src/constants/ToolTypes.js";
import { observer } from "mobx-react";
import ReactTable from "react-table";
import getColumns from "src/data/ColumnTableConnections";
import connectionRequest from "src/requests/ConnectionsRequest";
import Connection from "src/models/Connection";
import { paths } from "src/data/RoutesData";
import FooterManages from "src/containers/FooterManages";
import ROLES from "src/constants/Roles.js";
import TestStore from "src/test/TestStore";

// const testStore = new TestStore();

@observer
class TestTable extends Component {
  testStore = new TestStore();

  render() {
    const typeName = TOOL_TYPES.WAREHOUSE;

    return (
      <ReactTable
        data={this.testStore.connections}
        columns={getColumns(typeName)}
        defaultPageSize={5}
        getTrProps={this.onRowClick}
        filterable
        style={{
          height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className="-highlight table"
      />
    );
  }

  componentDidMount() {
    this.testStore.getConnections();
  }
}

export default TestTable;
