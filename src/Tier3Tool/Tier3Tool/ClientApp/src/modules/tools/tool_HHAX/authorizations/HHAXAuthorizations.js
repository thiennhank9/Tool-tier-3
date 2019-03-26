import React, { Component } from 'react';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import { get } from 'lodash';
import actions from './HHAXAuthorizationsActions';
import hhaxRequest from 'src/requests/HHAXRequest';
import HHAXAuthorizationsForm from './HHAXAuthorizationsForm';
import HHAXAuthorizationsTable from './HHAXAuthorizationsTable';

@observer
class HHAXAuthorizations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencies: ['']
    };
    this.requestGetAgencies = this.requestGetAgencies.bind(this);
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

  render() {
    return (
      <div>
        <HHAXAuthorizationsForm
          {...this.props}
          agencies={this.state.agencies}
          connection={this.props.connection}
          hhaxAuthorizationsStore={this.props.hhaxAuthorizationsStore}
          transStatuses={this.props.transStatuses}
        />
        <HHAXAuthorizationsTable
          {...this.props}
          connection={this.props.connection}
          hhaxAuthorizationsStore={this.props.hhaxAuthorizationsStore}
        />
      </div>
    );
  }

  componentDidMount() {
    this.requestGetAgencies();
  }

  componentWillUnmount() {
    this.props.hhaxAuthorizationsStore.resetAll();
  }
}

export default compose(actions)(HHAXAuthorizations);
