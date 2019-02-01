import React, { Component } from 'react';
import { Tabs, Tab, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import DatetimePicker from 'src/components/Tier3.DatetimePicker';
import WarehouseClientsForm from './WarehouseClientsForm';
import { compose } from 'recompose';
import Tier3Table from 'src/components/Tier3.Table';
import actions from './WarehouseClientsTableActions';

import getColumns from 'src/data/WarehouseClientsTableConfig';

const data = [];

class WarehouseClientsTable extends Component {
  render() {
    return <Tier3Table data={data} columns={getColumns(this.props.globalStore.locales)} />;
  }
}

export default compose(actions)(WarehouseClientsTable);
