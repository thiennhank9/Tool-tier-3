import React, { Component } from 'react';
import { compose } from 'recompose';
import actions from './WarehouseClientsTableActions';
import getColumns from 'src/data/WarehouseClientsTableConfig';
import ReactTable, { ReactTableDefaults } from 'react-table';
// import warehouseRequest from 'src/requests/WarehouseRequest';

const data = [];

class WarehouseClientsTable extends Component {
  render() {
    return (
      <ReactTable
        data={data}
        columns={getColumns(this.props.globalStore.locales)}
        defaultPageSize={5}
        column={{
          ...ReactTableDefaults.column,
          headerStyle: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        filterable
        style={{
          height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className='-highlight table'
      />
    );
  }
  
  componentDidMount(){
    // const objConnection = {
    //   connectionName: 'nhdemo-sql',
    //   serverName: 'nhdemo-sql',
    //   databaseName: 'NHOMEDW51_FL',
    //   login: 'nhomesa',
    //   password: 'asemohn123',
    // }
    // const objSearch = {
    //   firstName: 'nhan',
    // }
    // warehouseRequest.searchWarehouseClients(objConnection, objSearch).then(response => console.log(response))
  }
}

export default compose(actions)(WarehouseClientsTable);
