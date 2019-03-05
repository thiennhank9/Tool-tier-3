import React, { Component } from 'react';
import DynamicSearchForm from 'src/containers/DynamicSearchForm';
import getHHAXAuthorizationsFormData from 'src/data/HHAXAuthorizationsFormData';
import hhaxRequest from 'src/requests/HHAXRequest';
import { get } from 'lodash';

const SIZE = 'md';

export default class HHAXAuthorizationsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencies: ['']
    };

    this.requestGetAgencies = this.requestGetAgencies.bind(this);
    this.requestGetAuthorizations = this.requestGetAuthorizations.bind(this);
  }

  render() {
    return (
      <DynamicSearchForm
        globalStore={this.props.globalStore}
        mapForm={getHHAXAuthorizationsFormData(this)}
        size={SIZE}
        onClickSearch={data => {
          this.requestGetAuthorizations(data);
        }}
      />
    );
  }

  componentDidMount() {
    this.requestGetAgencies();
  }

  requestGetAuthorizations(authorizationSearch) {
    this.props.hhaxAuthorizationsStore.setAuthorizationSearch(authorizationSearch);
    this.props.hhaxAuthorizationsStore.setPage(0);
    this.props.hhaxAuthorizationsStore.getSearchAuthorizations(this.props.connection, this.props);
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
