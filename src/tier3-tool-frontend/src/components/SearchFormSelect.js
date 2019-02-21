import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

export default class SearchFromSelect extends Component {
  render() {
    const { label, value, options, onChange } = this.props.control;
    const size = this.props.size;

    return (
      <Form.Group size={size} as={Row}>
        <Form.Label size={size} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control value={value} as="select" size={size} onChange={onChange}>
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    );
  }
}
