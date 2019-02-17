import { observable, action } from 'mobx';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { forEach } from 'lodash';

export default class ConnectionStore {
  @observable connections = [];
  @observable selectedConnection = {}

  @action
  async getConnections() {
    // this.connections.length = 0;
    this.connections.replace([])
    // const response = await connectionRequest.getConnections();
  
    // forEach(response.data, connection => {
    //   this.connections.push(new Connection(connection));
    // });

    // console.log(this.connections)
    return connectionRequest.getConnections().then(response => {
      let results = [];
      forEach(response.data, connection => {
        // this.connections.push(new Connection(connection));
        results.push(new Connection(connection))
      });
      console.log('called')
      // console.log(this.connections)
      this.connections.replace(results);
    });
  }

  @action
  setSelectedConnection(connection){
    this.selectedConnection = connection
  }
}
