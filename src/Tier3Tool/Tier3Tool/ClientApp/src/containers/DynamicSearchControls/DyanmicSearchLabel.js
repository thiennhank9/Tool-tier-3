import React, { Component } from 'react';
import { Form, Row } from 'react-bootstrap';

class DynamicSearchLabel extends Component {
  render() {
    const { label, size } = this.props;

    return (
      <Form.Group as={Row}>
        <Form.Label size={size} column>
          {label}
        </Form.Label>
      </Form.Group>
    );
  }
}

export default DynamicSearchLabel;
