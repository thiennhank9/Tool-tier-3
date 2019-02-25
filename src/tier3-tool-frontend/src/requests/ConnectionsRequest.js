import appRequest from './AppRequest';
import TOOL_TYPES from 'src/constants/ToolTypes';

export default {
  getConnections() {
    return appRequest.get('/Connections');
  },
  getConnectionsWarehouse() {
    return appRequest.get('/Connections/warehouses');
  },
  getConnectionsHHAX() {
    return appRequest.get('/Connections/hhax');
  },
  addConnection(connection, type) {
    const { connectionName, serverName, databaseName, login, password } = connection;
    const connectionAdd = {
      connectionName,
      connectionType: type,
      serverName,
      databaseName,
      databaseUsername: login,
      databasePassword: password
    };
    const urlAdd = type === TOOL_TYPES.WAREHOUSE ? 'add-warehouse' : 'add-hhax';

    return appRequest.post(`/Connections/${urlAdd}`, { ...connectionAdd });
  },
  editConnection(connection, type) {
    const { connectionName, serverName, databaseName, login, password, id } = connection;
    const connectionEdit = {
      id,
      connectionName,
      connectionType: type,
      serverName,
      databaseName,
      databaseUsername: login,
      databasePassword: password
    };

    return appRequest.put('/Connections/edit-connection', connectionEdit);
  },
  removeConnection(connection, type){
    return appRequest.post('/Connections/delete-connection', connection);
  },

  testConnection(connection, type) {
    const { connectionName, serverName, databaseName, login, password } = connection;
    const connectionTest = {
      connectionName,
      connectionType: type,
      serverName,
      databaseName,
      databaseUsername: login,
      databasePassword: password
    };

    return appRequest.post('/Connections/test-connection', { ...connectionTest });
  }
};
