import { observable, action } from 'mobx';
import warehouseRequest from 'src/requests/WarehouseRequest';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

export default class WarehouseClientStore {
  @observable isClickedSearch = false;
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

  // Paging
  @observable pageTotal = 1;
  @observable pageSize = PAGE_DEFAULTS.PAGE_SIZE;
  @observable page = 0;

  @action
  resetAll() {
    this.isClickedSearch = false;
    // Authorization Search
    this.jurisdictions = [];

    this.jurisdiction = '';
    this.agencyID = '';
    this.firstName = '';
    this.lastName = '';
    this.memberID = '';
    this.admissionType = '';
    this.service = '';
    this.authRefNo = '';
    this.ftpFileName = '';
    this.authBegin = new Date();
    this.updatedFrom = new Date();
    this.authEnd = new Date();
    this.updatedTo = new Date();

    // Authorization Results in table
    this.isLoading = false;
    this.authorizationResults = [];

    // Paging
    this.pageTotal = 1;
    this.pageSize = PAGE_DEFAULTS.PAGE_SIZE;
    this.page = 0;
  }

  @action
  setJurisdiction(jurisdiction) {
    this.jurisdiction = jurisdiction;
  }

  @action
  setAgencyID(agencyID) {
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
  requestGetJurisdicions(objConnection, props) {
    this.jurisdictions = [];

    warehouseRequest
      .getJurisdiction(objConnection)
      .then(response => {
        let { data } = response;
        // Add the option for blank
        data.unshift('');

        this.jurisdictions = response.data;
      })
      .catch(error => {
        if (error.response.status === 401) {
          props.globalStore.setLogout();
        }
      });
  }

  @action
  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  requestGetAuthorizationResults(objConnection, paging, props) {
    this.isClickedSearch = true;
    this.setIsLoading();

    this.clientResults = [];
    const objPaging = {
      pageSize: paging.pageSize,
      pageNumber: paging.page + 1
    };

    warehouseRequest
      .searchWarehouseAuthorizations(objConnection, this, objPaging)
      .then(response => {
        this.setAuthorizationResults(response.data.authorizationResults);
        this.pageTotal = Math.ceil(response.data.totalRows / paging.pageSize);
        this.setIsLoading(false);
      })
      .catch(err => {
        if (err.response.status === 401) {
          props.globalStore.setLogout();
        }
        this.pageTotal = 1;
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
