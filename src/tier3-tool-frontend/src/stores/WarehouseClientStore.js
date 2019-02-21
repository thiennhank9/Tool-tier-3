import { observable, action } from 'mobx';
import warehouseRequest from 'src/requests/WarehouseRequest';

export default class WarehouseClientStore {
  // Client Search
  @observable jurisdictions = [];

  @observable jurisdiction = '';
  @observable firstName = '';
  @observable lastName = '';
  @observable memberID = '';
  @observable admissionType = '';
  @observable updatedFrom = new Date();
  @observable updatedTo = new Date();
  @observable ftpFileName = '';

  // Client Results in table
  @observable isLoading = false;
  @observable clientResults = [];

  @action
  setIsLoading(isLoading = true) {
    this.isLoading = isLoading;
  }

  @action
  setClientResults(results) {
    this.clientResults = results;
  }

  @action
  setJurisdiction(jurisdiction) {
    this.jurisdiction = jurisdiction;
  }

  @action
  setFirstName(firstName) {
    this.firstName = firstName;
  }

  @action
  setLastName(lastName) {
    this.lastName = lastName;
  }

  @action
  setMemberID(memberID) {
    this.memberID = memberID;
  }

  @action
  setAdmissionType(admissionType) {
    this.admissionType = admissionType;
  }

  @action
  setFtpFileName(ftpFileName) {
    this.ftpFileName = ftpFileName;
  }

  @action
  setUpdatedFrom(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.updatedFrom = date;
  }

  @action
  setUpdatedTo(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.updatedTo = date;
  }

  @action
  requestGetClientResults(objConnection) {
    this.setIsLoading();

    this.clientResults = [];

    warehouseRequest
      .searchWarehouseClients(objConnection, this)
      .then(response => {
        this.setClientResults(response.data);
        this.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        this.setIsLoading(false);
      });
  }

  @action
  requestGetJurisdicions(objConnection) {
    this.jurisdictions = [];

    warehouseRequest
      .getJurisdiction(objConnection)
      .then(response => {
        let { data } = response;
        // Add the option for blank
        data.unshift('');

        this.jurisdictions = response.data;
      })
      .catch(error => console.log(error));
  }

  @action
  clearClientSearch() {
    this.jurisdiction = '';
    this.firstName = '';
    this.lastName = '';
    this.memberID = '';
    this.admissionType = '';
    this.updatedFrom = null;
    this.updatedTo = null;
    this.ftpFileName = '';
  }
}
