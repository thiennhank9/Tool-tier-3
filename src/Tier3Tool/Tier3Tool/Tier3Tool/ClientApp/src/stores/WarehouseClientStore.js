import { observable, action } from 'mobx';
import warehouseRequest from 'src/requests/WarehouseRequest';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';

export default class WarehouseClientStore {
  @observable isClickedSearch = false;

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

  // Paging
  @observable pageTotal = 1;
  @observable pageSize = PAGE_DEFAULTS.PAGE_SIZE;
  @observable page = 0;

  @action
  resetAll() {
    this.isClickedSearch = false;
    this.jurisdictions = [];
    this.jurisdiction = '';
    this.firstName = '';
    this.lastName = '';
    this.memberID = '';
    this.admissionType = '';
    this.updatedFrom = new Date();
    this.updatedTo = new Date();
    this.ftpFileName = '';

    // Client Results in table
    this.isLoading = false;
    this.clientResults = [];

    // Paging
    this.pageTotal = 1;
    this.pageSize = PAGE_DEFAULTS.PAGE_SIZE;
    this.page = 0;
  }

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
  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  requestGetClientResults(objConnection, paging, props) {
    this.setIsLoading();
    this.isClickedSearch = true;
    this.clientResults = [];
    const objPaging = {
      pageSize: paging.pageSize,
      pageNumber: paging.page + 1
    };

    warehouseRequest
      .searchWarehouseClients(objConnection, this, objPaging)
      .then(response => {
        this.setClientResults(response.data.clientResults);
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
