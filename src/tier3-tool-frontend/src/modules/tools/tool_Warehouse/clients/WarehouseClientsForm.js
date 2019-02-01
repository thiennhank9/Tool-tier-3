import React, { Component } from 'react';
import { Tabs, Tab, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import DatetimePicker from 'src/components/Tier3.DatetimePicker';
import { compose } from 'recompose';
import actions from './WarehouseClientsFormActions';

class WarehouseClientsForm extends Component {
  render() {
    const {
      JURISDICTION,
      FIRSTNAME,
      LASTNAME,
      MEMBERID,
      ADMISSION_TYPE,
      UPDATED_FROM,
      UPDATED_TO,
      FTP_FILE_NAME,
      SEARCH,
      CLEAR_FILTERS
    } = this.props.globalStore.locales;
    
    return (
        <Form className="container-form">
          <Row className="container-row-form">
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {JURISDICTION}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="container-row-form">
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {FIRSTNAME}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="input" />
                </Col>
              </Form.Group>
            </Col>
            <Col className="container-blank-col" />
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {LASTNAME}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="input" />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="container-row-form">
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {MEMBERID}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="input" />
                </Col>
              </Form.Group>
            </Col>
            <Col className="container-blank-col" />
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={5}>
                  {ADMISSION_TYPE}
                </Form.Label>
                <Col sm={7}>
                  <Form.Control type="input" />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="container-row-form">
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {UPDATED_FROM}
                </Form.Label>
                <Col sm={8}>
                  <DatetimePicker />
                </Col>
              </Form.Group>
            </Col>
            <Col className="container-blank-col" />
            <Col style={{ width: 600 }}>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {FTP_FILE_NAME}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="input" />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="container-control-form">
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {UPDATED_TO}
                </Form.Label>
                <Col sm={8}>
                  <DatetimePicker />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <Button variant="primary" type="submit">
                {SEARCH}
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="primary" type="submit">
                {CLEAR_FILTERS}
              </Button>
            </Col>
          </Row>
        </Form>
    );
  }
}

export default compose(actions)(WarehouseClientsForm);
