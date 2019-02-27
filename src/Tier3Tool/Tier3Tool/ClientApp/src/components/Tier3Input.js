import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export default class Tier3Input extends Component {
  render() {
    const { label, isPassword, className = '', classNameLabel = '', classNameControl = '' } = this.props;

    return (
      <div className={`${className}`}>
        <Form.Label className={`${classNameLabel}`}>{label}</Form.Label>
        <Form.Control className={`${classNameControl}`} type={isPassword ? 'password' : 'plaintext'} />
      </div>
    );
  }
}
