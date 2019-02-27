import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchFormSelect from 'src/components/SearchFormSelect';
import SearchFormInput from 'src/components/SearchFormInput';
import SearchFormDate from 'src/components/SearchFormDate';

const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker'
};

export default class SearchForm extends Component {
  render() {
    const { mapForm, size } = this.props;

    return mapForm.map((rowForm, index) => {
      return (
        <Row className="container-row-form" key={index}>
          {rowForm.map((control, index) => {
            return (
              <Col md={6} key={index}>
                {control.type === CONTROL_TYPES.SELECT && <SearchFormSelect control={control} size={size} />}
                {control.type === CONTROL_TYPES.INPUT && <SearchFormInput control={control} size={size} />}
                {control.type === CONTROL_TYPES.DATE_PICKER && <SearchFormDate control={control} size={size} />}
              </Col>
            );
          })}
        </Row>
      );
    });
  }
}
