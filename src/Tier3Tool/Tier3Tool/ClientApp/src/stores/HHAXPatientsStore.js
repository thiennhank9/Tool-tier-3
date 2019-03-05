import { observable, action } from 'mobx';
import hhaxRequest from 'src/requests/HHAXRequest';
import PAGE_DEFAULTS from 'src/constants/PageDefaults';
import { get } from 'lodash';

export default class HHAXPatientsStore {
  @observable isClickedSearch = false;

  @observable patientSearch = {};

  // Patients Results in table
  @observable isLoading = false;
  @observable patients = [];

  // Paging
  @observable pageTotal = 1;
  @observable pageSize = PAGE_DEFAULTS.PAGE_SIZE;
  @observable page = 0;

  @action
  setPatientSearch(patientSearch) {
    this.patientSearch = patientSearch;
  }

  @action
  setIsLoading(isLoading = true) {
    this.isLoading = isLoading;
  }

  @action
  resetAll() {
    this.isClickedSearch = false;

    // Patients Results in table
    this.isLoading = false;
    this.patients = [];

    // Paging
    this.pageTotal = 1;
    this.pageSize = PAGE_DEFAULTS.PAGE_SIZE;
    this.page = 0;
  }

  @action
  setPatients(results) {
    this.patients = results;
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
  getSearchPatients(connection, props) {
    this.setIsLoading();
    this.isClickedSearch = true;
    this.patients = [];

    const objPaging = {
      pageSize: this.pageSize,
      pageNumber: this.page + 1
    };

    hhaxRequest
      .getPatients(connection, this.patientSearch, objPaging, props)
      .then(response => {
        this.setPatients(response.data.patientResults);
        this.pageTotal = Math.ceil(response.data.totalRows / this.pageSize);
        this.setIsLoading(false);
      })
      .catch(error => {
        this.setIsLoading(false);
        if (get(error, 'response.status', null) === 401) {
          props.globalStore.setLogout();
        }
      });
  }
}
