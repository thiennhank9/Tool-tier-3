import { observable, action, computed } from 'mobx';

export default class Connection {
  @observable id = 0;
  @observable connectionName = '';
  @observable connectionType = '';
  @observable serverName = '';
  @observable databaseName = '';
  @observable databaseUsername = '';
  @observable databasePassword = '';

  constructor(connection) {
    this.update(connection);
  }

  @computed get displayServerName() {
    return `${this.serverName}/${this.databaseName}`;
  }

  @action
  update(connection) {
    const {
      id,
      connectionName,
      connectionType,
      serverName,
      databaseName,
      databaseUsername,
      databasePassword
    } = connection;
    this.id = id;
    this.connectionName = connectionName;
    this.connectionType = connectionType;
    this.serverName = serverName;
    this.databaseName = databaseName;
    this.databaseUsername = databaseUsername;
    this.databasePassword = databasePassword;
  }
}
