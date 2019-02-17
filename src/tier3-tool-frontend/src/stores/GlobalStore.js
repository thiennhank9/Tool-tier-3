import { observable, computed, action } from 'mobx';

import localesData from 'src/data/LocalesData';

export default class GlobalStore {
  @observable isLogin = false;
  @observable selectedLocale = 'ENG';
  @observable isSysAdmin = true;
  @observable role = '';
  @observable token = '';
  @observable isRemembered = false;
  @observable canAccessDW = false;
  @observable canAccessHHAX = false;
  // @observable locales = localesData[this.selectedLocale];

  @action
  getResultsFromUserStore(userStore) {
    const { token, role, canAccessDW, canAccessHHAX } = userStore;
    this.token = token;
    this.role = role;
    this.canAccessDW = canAccessDW;
    this.canAccessHHAX = canAccessHHAX;
  }

  @action
  setLogin() {
    this.isLogin = true;
  }

  @action
  setLogout() {
    this.isLogin = false;
  }

  @computed get locales() {
    return localesData[this.selectedLocale];
  }

  @action
  setIsRemembered(isRemembered) {
    this.isRemembered = isRemembered;
  }
}
