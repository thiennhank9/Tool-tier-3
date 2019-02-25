import appRequest from './AppRequest';

export default {
  authenticate(username, password) {
    return appRequest.post('/Users/authenticate', { Username: username, Password: password });
  },
  getUsers() {
    return appRequest.get('/Users/get-users');
  },
  addUser(user) {
    // const config = {
    //   headers: { Authorization: 'bearer ' + token }
    // };
    return appRequest.post('/Users/add', user);
  },
  editUser(user) {
    return appRequest.put('/Users/edit', user);
  },
  deleteUser(user) {
    return appRequest.post('/Users/delete', user);
  }
};
