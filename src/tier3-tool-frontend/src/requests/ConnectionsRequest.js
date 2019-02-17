import appRequest from './AppRequest';

export default {
  getConnections() {
    return appRequest.get('/Connections');
  },
  getConnectionsWarehouse(){
    return appRequest.get('/Connections/warehouses');
  },
  getConnectionsHHAX(){
    return appRequest.get('/Connections/hhax');
  }
};
