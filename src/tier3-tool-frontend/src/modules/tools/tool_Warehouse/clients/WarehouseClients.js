import React, { Component } from 'react';
import { Tabs, Tab, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import DatetimePicker from 'src/components/Tier3.DatetimePicker';
import WarehouseClientsForm from './WarehouseClientsForm';
import WarehouseClientsTable from './WarehouseClientsTable';

import { compose } from 'recompose';

import actions from './WarehouseClientsActions';

class WarehouseClients extends Component {
  render() {
    const {
      JURISDICTION,
      FIRSTNAME,
      LASTNAME,
      MEMBERID,
      ADMISSION_TYPE,
      UPDATED_FROM,
      UPDATED_TO,
      FTP_FILE_NAME,
      SEARCH,
      CLEAR_FILTERS
    } = this.props.globalStore.locales;
    return (
      <div>
        <WarehouseClientsForm {...this.props} />
        <WarehouseClientsTable {...this.props}/>
      </div>
    );
  }
}

export default compose(actions)(WarehouseClients);
