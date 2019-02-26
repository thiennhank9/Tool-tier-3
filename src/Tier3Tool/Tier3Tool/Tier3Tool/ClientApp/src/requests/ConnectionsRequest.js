import appRequest from './AppRequest';
import TOOL_TYPES from 'src/constants/ToolTypes';

export default {
  getConnections(token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.get('/Connections', config);
  },
  getConnectionsWarehouse(token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.get('/Connections/warehouses', config);
  },
  getConnectionsHHAX(token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.get('/Connections/hhax', config);
  },
  addConnection(connection, type, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

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

    return appRequest.post(`/Connections/${urlAdd}`, { ...connectionAdd }, config);
  },
  editConnection(connection, type, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

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

    return appRequest.put('/Connections/edit-connection', connectionEdit, config);
  },
  removeConnection(connection, type, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.post('/Connections/delete-connection', connection, config);
  },

  testConnection(connection, type, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    const { connectionName, serverName, databaseName, login, password } = connection;
    const connectionTest = {
      connectionName,
      connectionType: type,
      serverName,
      databaseName,
      databaseUsername: login,
      databasePassword: password
    };

    return appRequest.post('/Connections/test-connection', { ...connectionTest }, config);
  }
};
