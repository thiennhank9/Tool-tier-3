import React, { Component } from 'react';

export default class Tier3Label extends Component {
  render() {
    const { label = '' } = this.props;

    return (
      <center>
        <h1>{label}</h1>
      </center>
    );
  }
}
