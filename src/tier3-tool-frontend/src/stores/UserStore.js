import { observable, action } from 'mobx';
import userRequest from 'src/requests/UserRequest';

export default class UserStore {
  @observable username = '';
  @observable password = '';
  @observable token = '';
  @observable role = '';
  @observable canAccessDW = false;
  @observable canAccessHHAX = false;
  @observable status = 0;
  @observable statusText = '';
  @observable errorMessage = '';
  @observable isRemembered = false;

  @action
  setUsername(username = '') {
    this.username = username;
  }

  @action
  setPassword(password = '') {
    this.password = password;
  }

  @action
  toggleIsRemembered() {
    this.isRemembered = !this.isRemembered;
  }

  @action
  callAuthenticate() {
    return userRequest
      .authenticate(this.username, this.password)
      .then(response => {
        const { status, statusText } = response;

        this.status = status;
        this.statusText = statusText;
        this.errorMessage = '';

        if (status === 200) {
          this.canAccessDW = response.data.canAccessDW;
          this.canAccessHHAX = response.data.canAccessHHAX;
          this.token = response.data.token;
          this.role = response.data.role;
        }
      })
      .catch(error => {
        const {
          response: {
            status,
            statusText,
            data: { message }
          }
        } = error;

        this.status = status;
        this.statusText = statusText;
        this.errorMessage = message;
        this.canAccessDW = '';
        this.canAccessHHAX = '';
        this.token = '';
        this.role = '';
      });
  }
}
