import { observable, action } from 'mobx';
import Database from './Connection';

export default class PairConnection {
  @observable id = 0;
  @observable connectionName = '';
  @observable connectionType = 1; // 1: Warehouse, 2: HHAX
  @observable serverAdmin = new Database();
  @observable serverDatabase = new Database();

  @action
  setId(id: number = 1) {
    this.id = id;
  }

  @action
  setConnectionName(connectionName: string = '') {
    this.connectionName = connectionName;
  }

  @action
  setConnectionType(connectionType: number = 1) {
    this.connectionType = connectionType;
  }

  @action
  setServerAdmin(serverAdmin: any = {}) {
    this.serverAdmin.update(serverAdmin);
  }

  @action
  setServerDatabase(serverDatabase: any = {}) {
    this.serverDatabase.update(serverDatabase);
  }
}
