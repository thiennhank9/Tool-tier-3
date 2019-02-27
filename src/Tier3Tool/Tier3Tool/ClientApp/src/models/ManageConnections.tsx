import { observable, action } from 'mobx';
import PairConnection from './PairConnection';

export default class ManageConnections {
  @observable pairConnectionsWarehouse = [new PairConnection()];
  @observable pairConnectionsHHAX = [new PairConnection()];
  @observable selectedPairConnection = new PairConnection();
  @observable selectedType = 1;

  @action
  setSelectedPairConnection(selectedPairConnection: any = {}, selectedType: number = 1) {
    this.selectedPairConnection = selectedPairConnection;
    this.selectedType = selectedType;
  }
}
