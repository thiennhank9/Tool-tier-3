import { observable, computed, action } from 'mobx';

import localesData from 'src/data/LocalesData';

export default class GlobalStore {
  @observable isLogin = false;
  @observable selectedLocale = 'ENG';
  @observable isSysAdmin = true;

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
}
