import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatetimePicker from 'src/components/Tier3.DatetimePicker';
import { compose } from 'recompose';
import actions from './WarehouseClientsFormActions';
import warehouseRequest from 'src/requests/WarehouseRequest';
import { isEmpty } from 'lodash';

const CONTROL_TYPES = {
  SELECT: 'select',
  INPUT: 'input',
  DATE_PICKER: 'date-picker'
};

const SIZE_FORM = 'md';

class WarehouseClientsForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      jurisdictions: [],
      jurisdiction: '',
      firstName: '',
      lastName: '',
      memberID: '',
      admissionType: '',
      updatedFrom: new Date(),
      updatedTo: new Date(),
      ftpFileName: ''
    };

    this.handleSelectJurisdiction = this.handleSelectJurisdiction.bind(this);
    this.handleInputFirstName = this.handleInputFirstName.bind(this);
    this.handleInputLastName = this.handleInputLastName.bind(this);
    this.handleInputMemberID = this.handleInputMemberID.bind(this);
    this.handleInputAdmissionType = this.handleInputAdmissionType.bind(this);
    this.handleInputFTPFileName = this.handleInputFTPFileName.bind(this);
    this.handleDateUpdatedFrom = this.handleDateUpdatedFrom.bind(this);
    this.handleDateUpdatedTo = this.handleDateUpdatedTo.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
  }

  renderFormSelect(label, value, options, onChange) {
    return (
      <Form.Group size={SIZE_FORM} as={Row}>
        <Form.Label size={SIZE_FORM} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control value={value} as="select" size={SIZE_FORM} onChange={onChange}>
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
    );
  }

  renderFormInput(label, value, onChange) {
    return (
      <Form.Group as={Row}>
        <Form.Label size={SIZE_FORM} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <Form.Control size={SIZE_FORM} type="input" value={value} onChange={onChange} />
        </Col>
      </Form.Group>
    );
  }

  renderFormDatePicker(label, value, onChange) {
    return (
      <Form.Group as={Row}>
        <Form.Label size={SIZE_FORM} column sm={4}>
          {label}
        </Form.Label>
        <Col sm={8}>
          <DatetimePicker selected={value} onChange={onChange} style={{ width: 700 }} />
        </Col>
      </Form.Group>
    );
  }

  handleSelectJurisdiction(e) {
    this.setState({
      jurisdiction: e.target.value
    });
  }

  handleInputFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  handleInputLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  handleInputMemberID(e) {
    this.setState({
      memberID: e.target.value
    });
  }

  handleInputAdmissionType(e) {
    this.setState({
      admissionType: e.target.value
    });
  }

  handleInputFTPFileName(e) {
    this.setState({
      ftpFileName: e.target.value
    });
  }

  handleDateUpdatedFrom(date, date2) {
    this.setState({
      updatedFrom: date
    });
  }

  handleDateUpdatedTo(date) {
    this.setState({
      updatedTo: date
    });
  }

  handleClickSearch() {
    const objConnection = {
      ConnectionType: 'Warehouse',
      ConnectionName: 'nhdemo-sql',
      ServerName: 'nhdemo-sql',
      DatabaseName: 'NHOMEDW51_FL',
      DatabaseUsername: 'nhomesa',
      DatabasePassword: 'asemohn123'
    };
    warehouseRequest
      .searchWarehouseClients(objConnection, this.state)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  handleClickClear() {
    this.setState({
      jurisdiction: '',
      firstName: '',
      lastName: '',
      memberID: '',
      admissionType: '',
      updatedFrom: new Date(),
      updatedTo: new Date(),
      ftpFileName: ''
    });
  }

  renderFormRows() {
    const {
      JURISDICTION,
      FIRSTNAME,
      LASTNAME,
      MEMBERID,
      ADMISSION_TYPE,
      UPDATED_FROM,
      UPDATED_TO,
      FTP_FILE_NAME
    } = this.props.globalStore.locales;

    const rowsForm = [
      [
        {
          type: CONTROL_TYPES.SELECT,
          label: JURISDICTION,
          value: this.state.jurisdiction,
          options: this.state.jurisdictions,
          onChange: this.handleSelectJurisdiction
        }
      ],
      [
        {
          type: CONTROL_TYPES.INPUT,
          label: FIRSTNAME,
          value: this.state.firstName,
          onChange: this.handleInputFirstName
        },
        {
          type: CONTROL_TYPES.INPUT,
          label: LASTNAME,
          value: this.state.lastName,
          onChange: this.handleInputLastName
        }
      ],
      [
        {
          type: CONTROL_TYPES.INPUT,
          label: MEMBERID,
          value: this.state.memberID,
          onChange: this.handleInputMemberID
        },
        {
          type: CONTROL_TYPES.INPUT,
          label: ADMISSION_TYPE,
          value: this.state.admissionType,
          onChange: this.handleInputAdmissionType
        }
      ],
      [
        {
          type: CONTROL_TYPES.DATE_PICKER,
          label: UPDATED_FROM,
          value: this.state.updatedFrom,
          onChange: this.handleDateUpdatedFrom
        },
        {
          type: CONTROL_TYPES.INPUT,
          label: FTP_FILE_NAME,
          value: this.state.ftpFileName,
          onChange: this.handleInputFTPFileName
        }
      ],
      [
        {
          type: CONTROL_TYPES.DATE_PICKER,
          label: UPDATED_TO,
          value: this.state.updatedTo,
          onChange: this.handleDateUpdatedTo
        }
      ]
    ];

    return rowsForm.map((rowForm, index) => {
      return (
        <Row className="container-row-form" key={index}>
          {rowForm.map((control, index) => {
            return (
              <Col md={6} key={index}>
                {control.type === CONTROL_TYPES.SELECT &&
                  this.renderFormSelect(control.label, control.value, control.options, control.onChange)}
                {control.type === CONTROL_TYPES.INPUT &&
                  this.renderFormInput(control.label, control.value, control.onChange)}
                {control.type === CONTROL_TYPES.DATE_PICKER &&
                  this.renderFormDatePicker(control.label, control.value, control.onChange)}
              </Col>
            );
          })}
        </Row>
      );
    });
  }

  renderButtonsForm() {
    const { SEARCH, CLEAR_FILTERS } = this.props.globalStore.locales;

    return (
      <Row>
        <Col md={1}>
          <Button variant="primary" onClick={this.handleClickSearch}>
            {SEARCH}
          </Button>
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={this.handleClickClear}>
            {CLEAR_FILTERS}
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Form className="container-form">
        {this.renderFormRows()}
        {this.renderButtonsForm()}
      </Form>
    );
  }

  componentDidMount() {
    const objConnection = {
      ConnectionType: 'Warehouse',
      ConnectionName: 'nhdemo-sql',
      ServerName: 'nhdemo-sql',
      DatabaseName: 'NHOMEDW51_FL',
      DatabaseUsername: 'nhomesa',
      DatabasePassword: 'asemohn123'
    };

    warehouseRequest
      .getJurisdiction(objConnection)
      .then(response => {
        let { data } = response;
        // Add the option for blank
        data.unshift('');

        this.setState({
          jurisdictions: response.data
          // jurisdiction: isEmpty(response.data) ? '' : response.data[0]
        });
      })
      .catch(error => console.log(error));
  }
}

export default compose(actions)(WarehouseClientsForm);
