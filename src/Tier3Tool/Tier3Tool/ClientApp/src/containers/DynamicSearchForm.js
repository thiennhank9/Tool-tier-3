import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { forEach, merge, has, isEmpty } from 'lodash';
import DynamicSearchInput from './DynamicSearchControls/DynamicSearchInput';
import DynamicSearchSelect from './DynamicSearchControls/DynamicSearchSelect';
import DynamicSearchDate from './DynamicSearchControls/DynamicSearchDate';
import DynamicSearchLabel from './DynamicSearchControls/DyanmicSearchLabel';
import DynamicSearchSelectAgency from './DynamicSearchControls/DynamicSearchSelectAgency';

const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker',
  LABEL: 'label',
  SELECT_AGENCY: 'select-agency'
};

class DynamicSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    let objState = {};

    forEach(props.mapForm, row => {
      forEach(row, col => {
        if (has(col, 'valueName')) {
          objState[col.valueName] = col.initalValue;
        }
      });
    });

    merge(this.state, objState);

    this.onClickClear = this.onClickClear.bind(this);
  }

  validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if (key < 48 || key > 57) {
      return false;
    } else {
      return true;
    }
  }

  onClickClear() {
    const { mapForm } = this.props;

    forEach(mapForm, row => {
      forEach(row, col => {
        if (has(col, 'valueName')) {
          this.setState({
            [col.valueName]: col.type === CONTROL_TYPES.DATE_PICKER ? null : ''
          });
        }
      });
    });
  }

  renderForm() {
    const { mapForm, size } = this.props;

    return mapForm.map((rowForm, index) => {
      return (
        <Row className="container-row-form" key={index}>
          {rowForm.map((control, index) => {
            return (
              <Col md={6} key={index}>
                {control.type === CONTROL_TYPES.INPUT && (
                  <DynamicSearchInput
                    label={control.label}
                    value={this.state[control.valueName]}
                    onChange={e => {
                      this.setState({ [control.valueName]: e.target.value });
                    }}
                    size={size}
                  />
                )}
                {control.type === CONTROL_TYPES.SELECT && (
                  <DynamicSearchSelect
                    label={control.label}
                    value={this.state[control.valueName]}
                    options={control.options}
                    onChange={e => this.setState({ [control.valueName]: e.target.value })}
                    size={size}
                  />
                )}
                {control.type === CONTROL_TYPES.SELECT_AGENCY && (
                  <DynamicSearchSelectAgency
                    label={control.label}
                    value={this.state[control.valueName]}
                    options={control.options}
                    onChange={e => {
                      this.setState({ [control.valueName]: e.target.value });
                    }}
                    size={size}
                  />
                )}
                {control.type === CONTROL_TYPES.DATE_PICKER && (
                  <DynamicSearchDate
                    label={control.label}
                    value={this.state[control.valueName]}
                    onChange={date => {
                      if (typeof date === 'string') {
                        date = new Date(date);
                      }
                      this.setState({ [control.valueName]: date });
                    }}
                    size={size}
                  />
                )}
                {control.type === CONTROL_TYPES.LABEL && <DynamicSearchLabel label={control.label} size={size} />}
              </Col>
            );
          })}
        </Row>
      );
    });
  }

  renderButtonsForm() {
    const { SEARCH, CLEAR_FILTERS } = this.props.globalStore.locales;

    return (
      <Row className="container-buttons-form">
        <Button variant="primary" onClick={() => this.props.onClickSearch(this.state)}>
          {SEARCH}
        </Button>
        <Button variant="primary" onClick={this.onClickClear}>
          {CLEAR_FILTERS}
        </Button>
      </Row>
    );
  }

  render() {
    return (
      <Form className="container-form">
        {this.renderForm()}
        {this.renderButtonsForm()}
      </Form>
    );
  }
}

export default DynamicSearchForm;
