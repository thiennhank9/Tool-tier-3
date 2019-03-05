import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { isNil } from 'lodash';

export default class SearchFromSelectAgency extends Component {
  render() {
    const { label, options, value, onChange, size } = this.props;

    return (
      <Form.Group size={size} as={Row}>
        <Form.Label size={size} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control value={value} as="select" size={size} onChange={onChange}>
            {options.map((option, index) => (
              <option value={option.agencyID} key={index}>
                {isNil(option.agencyID) ? '' : `${option.agencyID} - ${option.agencyName}`}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    );
  }
}
