import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import DatetimePicker from 'src/components/Tier3.DatetimePicker';

export default class SearchFormDate extends Component {
  render() {
    const { label, value, onChange, size } = this.props;

    return (
      <Form.Group as={Row}>
        <Form.Label size={size} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <DatetimePicker selected={value} onChange={onChange} style={{ width: 700 }} />
        </Col>
      </Form.Group>
    );
  }
}
