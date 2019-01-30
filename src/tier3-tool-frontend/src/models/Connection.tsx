import { observable, action } from 'mobx';

export default class Connection {
  @observable id = 0;
  @observable type = 0; // 0: Admin, 1: Warehouse, 2: HHAX
  @observable serverName = '';
  @observable databaseName = '';
  @observable username = '';
  @observable password = '';

  constructor(database: any = {}) {
      this.update(database)
  }

  @action
  update(database: any = {}) {
    const { id, type, serverName, databaseName, username, password } = database;
    
    this.setId(id);
    this.setType(type);
    this.setServerName(serverName);
    this.setDatabaseName(databaseName);
    this.setUsername(username);
    this.setPassword(password);
  }

  @action
  setType(type: number = 0) {
    this.type = type;
  }

  @action
  setId(id: number = 0) {
    this.id = id;
  }

  @action
  setServerName(serverName: string = '') {
    this.serverName = serverName;
  }

  @action
  setDatabaseName(databaseName: string = '') {
    this.databaseName = databaseName;
  }

  @action
  setUsername(username: string = '') {
    this.username = username;
  }

  @action
  setPassword(password: string = '') {
    this.password = password;
  }
}
