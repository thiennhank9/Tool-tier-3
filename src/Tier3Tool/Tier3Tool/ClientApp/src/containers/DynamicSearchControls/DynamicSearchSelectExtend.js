import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { isNil } from 'lodash';

export default class SearchFromSelectExtend extends Component {
  render() {
    const { label, options, value, valueName, optionLabel, onChange, size } = this.props;

    return (
      <Form.Group size={size} as={Row}>
        <Form.Label size={size} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control value={value} as="select" size={size} onChange={onChange}>
            {options.map((option, index) => (
              <option value={option[valueName]} key={index}>
                {optionLabel(option)}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    );
  }
}
