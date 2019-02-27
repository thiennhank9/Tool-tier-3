import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Col } from 'react-bootstrap';

@observer
class SelectConnectionButton extends Component {
  render() {
    const { label1, label2, canAccess, onClick } = this.props;
    return (
      <Col>
        <center>
          <Button
            className="button-select-tool"
            variant={canAccess ? 'primary' : 'light'}
            type="submit"
            onClick={onClick}
            disabled={!canAccess}
          >
            <span style={{ textDecoration: 'underline' }}>{label1}:</span>
            <br />
            {label2}
          </Button>
        </center>
      </Col>
    );
  }
}

export default SelectConnectionButton;
