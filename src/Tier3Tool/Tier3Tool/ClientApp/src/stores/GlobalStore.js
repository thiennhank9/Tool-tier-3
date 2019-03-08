import { observable, computed, action } from 'mobx';
import { isNil, isEmpty } from 'lodash';
import localesData from 'src/data/LocalesData';

export default class GlobalStore {
  @observable username = '';
  @observable isLogin = false;
  @observable selectedLocale = 'ENG';
  @observable role = '';
  @observable token = '';
  @observable isRemembered = false;
  @observable canAccessDW = false;
  @observable canAccessHHAX = false;
  @observable isTimeOut = false;

  @action
  clearAfterLogout() {
    this.username = '';
    this.isLogin = false;
    this.selectedLocale = 'ENG';
    this.role = '';
    this.token = '';
    this.canAccessDW = '';
  }

  @action
  getResultsFromUserStore(userStore) {
    const { token, role, canAccessDW, canAccessHHAX, username } = userStore;
    this.username = username;
    this.token = token;
    this.role = role;
    this.canAccessDW = canAccessDW;
    this.canAccessHHAX = canAccessHHAX;

    localStorage.setItem('globalStorage', JSON.stringify(this));
  }

  setToLocalStorage() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('selectedLocale', this.selectedLocale);
    localStorage.setItem('role', this.role);
    localStorage.setItem('token', this.token);
    localStorage.setItem('isRemembered', JSON.stringify(this.isRemembered));
    localStorage.setItem('canAccessDW', JSON.stringify(this.canAccessDW));
    localStorage.setItem('canAccessHHAX', JSON.stringify(this.canAccessHHAX));
  }

  @action
  getFromLocalStorage() {
    if (!isNil(localStorage.getItem('username')) && !isEmpty(localStorage.getItem('username'))) {
      this.username = localStorage.getItem('username');
    }

    if (!isNil(localStorage.getItem('selectedLocale')) && !isEmpty(localStorage.getItem('selectedLocale'))) {
      this.selectedLocale = localStorage.getItem('selectedLocale');
    }

    if (!isNil(localStorage.getItem('role')) && !isEmpty(localStorage.getItem('role'))) {
      this.role = localStorage.getItem('role');
    }

    if (!isNil(localStorage.getItem('token')) && !isEmpty(localStorage.getItem('token'))) {
      this.token = localStorage.getItem('token');
    }

    if (!isNil(JSON.parse(localStorage.getItem('isRemembered')))) {
      this.isRemembered = JSON.parse(localStorage.getItem('isRemembered'));
    }
    if (!isNil(JSON.parse(localStorage.getItem('canAccessDW')))) {
      this.canAccessDW = JSON.parse(localStorage.getItem('canAccessDW'));
    }

    if (!isNil(JSON.parse(localStorage.getItem('canAccessHHAX')))) {
      this.canAccessHHAX = JSON.parse(localStorage.getItem('canAccessHHAX'));
    }
  }

  deleteLocalStorage() {
    localStorage.removeItem('token', '');
    localStorage.removeItem('role', '');
    localStorage.removeItem('canAccessDW', '');
    localStorage.removeItem('canAccessHHAX', '');
  }

  @action
  setIsTimeOut(isTimeOut) {
    this.isTimeOut = isTimeOut;
  }

  @action
  setLogin() {
    this.isTimeOut = false;
    this.isLogin = true;
  }

  @action
  setLogout(isTimeout = true) {
    this.deleteLocalStorage();
    this.isTimeOut = isTimeout;
    this.isLogin = false;
    this.clearAfterLogout();
  }

  @computed get locales() {
    return localesData[this.selectedLocale];
  }

  @action
  setIsRemembered(isRemembered) {
    this.isRemembered = isRemembered;
  }

  @action
  toggleIsRemembered() {
    this.isRemembered = !this.isRemembered;
  }
}
