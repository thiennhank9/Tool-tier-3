import { observable, action } from 'mobx';
import userRequest from 'src/requests/UserRequest';

export default class ManagesUsersStore {
  @observable users = [];
  @observable selectedUser = {};

  @action
  setSelectedUser(selectedUser) {
    this.selectedUser = selectedUser;
  }

  @action
  requestGetUsers(props) {
    this.users = [];
    return userRequest
      .getUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        if (error.response.status === 401) {
          props.globalStore.setLogout();
        }
      });
  }

  @action
  requestAddUser(user, props) {
    return userRequest
      .addUser(user)
      .then(reponse => console.log(reponse))
      .catch(error => {
        if (error.response.status === 401) {
          props.globalStore.setLogout();
        }
      });
  }

  @action
  requestEditUser(user, props) {
    return userRequest
      .editUser(user)
      .then(reponse => console.log(reponse))
      .catch(error => {
        if (error.response.status === 401) {
          props.globalStore.setLogout();
        }
      });
  }

  @action
  requestDeleteUser(props) {
    return userRequest
      .deleteUser(this.selectedUser)
      .then(response => console.log(response))
      .catch(error => {
        if (error.response.status === 401) {
          props.globalStore.setLogout();
        }
      });
  }
}
