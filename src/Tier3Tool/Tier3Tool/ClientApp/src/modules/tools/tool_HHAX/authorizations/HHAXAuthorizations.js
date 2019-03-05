import React, { Component } from 'react';
import DynamicSearchForm from 'src/containers/DynamicSearchForm';
import getHHAXPatientsFormData from 'src/data/HHAXAuthorizationsFormData';

const SIZE = 'md';

class HHAXAuthorizations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencies: ['']
    };
  }

  render() {
    return (
      <div>
        <DynamicSearchForm
          globalStore={this.props.globalStore}
          mapForm={getHHAXPatientsFormData(this)}
          size={SIZE}
          onClickSearch={data => {
            console.log(data);
          }}
        />
      </div>
    );
  }

  componentDidMount() {}
}

export default HHAXAuthorizations;
