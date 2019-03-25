import React, { Component } from 'react';
import DynamicSearchForm from 'src/containers/DynamicSearchForm';
import getHHAXPatientsFormData from 'src/data/HHAXPatientsFormData';
import hhaxRequest from 'src/requests/HHAXRequest';
import { get } from 'lodash';
import { resetScrollInsideTable } from 'src/utils/utils';

const SIZE = 'md';

export default class HHAXPatientsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencies: ['']
    };

    this.requestGetAgencies = this.requestGetAgencies.bind(this);
    this.requestGetPatients = this.requestGetPatients.bind(this);
  }

  render() {
    return (
      <DynamicSearchForm
        globalStore={this.props.globalStore}
        mapForm={getHHAXPatientsFormData(this)}
        size={SIZE}
        onClickSearch={data => {
          return this.requestGetPatients(data);
        }}
      />
    );
  }

  componentDidMount() {
    this.requestGetAgencies();
  }

  requestGetPatients(patientSearch) {
    this.props.hhaxPatientsStore.setPatientSearch(patientSearch);
    this.props.hhaxPatientsStore.setPage(0);
    this.props.hhaxPatientsStore.getSearchPatients(this.props.connection, this.props);
    resetScrollInsideTable(0)
  }

  requestGetAgencies() {
    hhaxRequest
      .getAgencies(this.props.connection)
      .then(response => {
        let { data } = response;

        // Add the blank option
        data.unshift({
          agencyID: null,
          agencyName: null
        });

        this.setState({
          agencies: data
        });
      })
      .catch(error => {
        if (get(error, 'response.status', null) === 401) {
          this.props.globalStore.setLogout();
        }
      });
  }
}
