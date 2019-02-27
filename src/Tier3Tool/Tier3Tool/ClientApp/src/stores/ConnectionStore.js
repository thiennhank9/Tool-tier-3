import { observable, action } from 'mobx';
import connectionRequest from 'src/requests/ConnectionsRequest';
import Connection from 'src/models/Connection';
import { forEach } from 'lodash';

export default class ConnectionStore {
  @observable connections = [];
  @observable selectedConnection = {}

  @action
  clearAll(){
    this.connections = [];
    this.selectedConnection = {}
  }

  @action
  async getConnections() {
    this.connections.replace([])

    return connectionRequest.getConnections().then(response => {
      let results = [];
      forEach(response.data, connection => {
        results.push(new Connection(connection))
      });

      this.connections.replace(results);
    });
  }

  @action
  setSelectedConnection(connection){
    this.selectedConnection = connection
  }
}
