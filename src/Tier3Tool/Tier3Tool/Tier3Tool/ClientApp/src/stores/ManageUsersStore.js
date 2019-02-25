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
  requestGetUsers() {
    this.users = [];
    return userRequest
      .getUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action
  requestAddUser(user) {
    return userRequest
      .addUser(user)
      .then(reponse => console.log(reponse))
      .catch(error => console.log(error));
  }

  @action
  requestEditUser(user) {
    return userRequest
      .editUser(user)
      .then(reponse => console.log(reponse))
      .catch(error => console.log(error));
  }

  @action
  requestDeleteUser() {
    return userRequest
      .deleteUser(this.selectedUser)
      // .then(reponse => console.log(reponse))
      // .catch(error => console.log(error));
  }
}
