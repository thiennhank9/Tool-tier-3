import { observable, action } from 'mobx';
import warehouseRequest from 'src/requests/WarehouseRequest';

export default class WarehouseClientStore {
  // Authorization Search
  @observable jurisdictions = [];

  @observable jurisdiction = '';
  @observable agencyID = '';
  @observable firstName = '';
  @observable lastName = '';
  @observable memberID = '';
  @observable admissionType = '';
  @observable service = '';
  @observable authRefNo = '';
  @observable ftpFileName = '';
  @observable authBegin = new Date();
  @observable updatedFrom = new Date();
  @observable authEnd = new Date();
  @observable updatedTo = new Date();

  // Authorization Results in table
  @observable isLoading = false;
  @observable authorizationResults = [];

  @action
  setJurisdiction(jurisdiction) {
    this.jurisdiction = jurisdiction;
  }

  @action
  setAgencyID(agencyID){
    this.agencyID = agencyID;
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
  setService(service) {
    this.service = service;
  }

  @action
  setAuthRefNo(authRefNo) {
    this.authRefNo = authRefNo;
  }

  @action
  setFtpFileName(ftpFileName) {
    this.ftpFileName = ftpFileName;
  }

  @action
  setAuthBegin(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.authBegin = date;
  }

  @action
  setUpdatedFrom(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.updatedFrom = date;
  }

  @action
  setAuthEnd(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.authEnd = date;
  }

  @action
  setUpdatedTo(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    this.updatedTo = date;
  }

  @action
  setIsLoading(isLoading = true) {
    this.isLoading = isLoading;
  }

  @action
  setAuthorizationResults(results) {
    this.authorizationResults = results;
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
  requestGetAuthorizationResults(objConnection) {
    this.setIsLoading();

    this.clientResults = [];

    warehouseRequest
      .searchWarehouseAuthorizations(objConnection, this)
      .then(response => {
        this.setAuthorizationResults(response.data);
        this.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        this.setIsLoading(false);
      });
  }

  @action
  clearAuthorizationSearch() {
    this.jurisdiction = '';
    this.agencyID = '';
    this.firstName = '';
    this.lastName = '';
    this.memberID = '';
    this.admissionType = '';
    this.service = '';
    this.memberID = '';
    this.ftpFileName = '';
    this.authBegin = null;
    this.updatedFrom = null;
    this.authEnd = null;
    this.updatedTo = null;
  }
}
