import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

export default class SearchFormInput extends Component {
  render() {
    const { label, value, onChange } = this.props.control;
    const size = this.props.size;

    return (
      <Form.Group as={Row}>
        <Form.Label size={size} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control size={size} type="input" value={value} onChange={onChange} />
        </Col>
      </Form.Group>
    );
  }
}
