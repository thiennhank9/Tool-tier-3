import { observable, action } from 'mobx';

export default class HHAX_PatientsSearch {
  @observable agencies = [];
  @observable agency = '';
  @observable firstName = '';
  @observable lastName = '';
  @observable patientID = '';
  @observable admissionID = '';
  @observable status = '';
  @observable mrNumber = '';
  @observable insertedFrom = new Date();
  @observable insertedTo = new Date();
  @observable modifiedFrom = new Date();
  @observable modifiedTo = new Date();

  @action
  clearAll() {
    this.agency = '';
    this.firstName = '';
    this.lastName = '';
    this.patientID = '';
    this.admissionID = '';
    this.status = '';
    this.mrNumber = '';
    this.insertedFrom = null;
    this.insertedTo = null;
    this.modifiedFrom = null;
    this.modifiedTo = null;
  }
}
