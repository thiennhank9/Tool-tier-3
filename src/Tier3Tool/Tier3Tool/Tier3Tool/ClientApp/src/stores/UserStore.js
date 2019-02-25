import { observable, action } from 'mobx';
import userRequest from 'src/requests/UserRequest';
import { isEmpty } from 'lodash';

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
    localStorage.setItem('isRemembered', JSON.stringify(this.isRemembered));
  }

  @action
  recoverRememberedLogin() {
    this.isRemembered = JSON.parse(localStorage.getItem('isRemembered'));

    if (this.isRemembered) {
      this.username = localStorage.getItem('username');
      this.password = localStorage.getItem('password');
    }
  }

  @action
  removeAuthInfo() {
    this.canAccessDW = '';
    this.canAccessHHAX = '';
    this.token = '';
    this.role = '';
  }

  @action
  callAuthenticate() {
    if (isEmpty(this.username) || isEmpty(this.password)) {
      this.errorMessage = 'Plesae full fill username and passwod!';
      return Promise.reject();
    }

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

          localStorage.setItem('token', this.token);
          localStorage.setItem('role', this.role);
          localStorage.setItem('canAccessDW', JSON.stringify(this.canAccessDW));
          localStorage.setItem('canAccessHHAX', JSON.stringify(this.canAccessHHAX));
        }
      })
      .catch(error => {
        if (!error.response) {
          this.errorMessage = 'Can not connect to server!';
          this.removeAuthInfo();
          return;
        }

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
        this.removeAuthInfo();
      });
  }
}
