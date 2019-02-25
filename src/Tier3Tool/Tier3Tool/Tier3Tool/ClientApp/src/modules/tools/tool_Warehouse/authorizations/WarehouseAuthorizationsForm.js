import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsFormActions';
import { observer } from 'mobx-react';
import SearchForm from 'src/containers/SearchForm';
import getWarehouseAuthorizationsFormData from 'src/data/WarehouseAuthorizationsFormData';

const SIZE_FORM = 'md';

@observer
class WarehouseAuthorizationsForm extends Component {
  renderFormRows() {
    const getMapForm = getWarehouseAuthorizationsFormData.bind(this);

    return <SearchForm mapForm={getMapForm()} size={SIZE_FORM} />;
  }

  renderButtonsForm() {
    const { SEARCH, CLEAR_FILTERS } = this.props.globalStore.locales;

    const { connection } = this.props;

    return (
      <Row className="container-buttons-form">
        <Button variant="primary" onClick={() => this.props.handleClickSearch(connection)}>
          {SEARCH}
        </Button>
        <Button variant="primary" onClick={this.props.handleClickClear}>
          {CLEAR_FILTERS}
        </Button>
      </Row>
    );
  }

  render() {
    return (
      <Form className="container-form">
        {this.renderFormRows()}
        {this.renderButtonsForm()}
      </Form>
    );
  }

  componentDidMount() {
    const { connection } = this.props;

    this.props.warehouseAuthorizationsStore.requestGetJurisdicions(connection);
  }
}

export default compose(actions)(WarehouseAuthorizationsForm);
