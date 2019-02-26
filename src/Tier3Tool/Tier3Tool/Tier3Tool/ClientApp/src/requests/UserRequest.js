import appRequest from './AppRequest';

export default {
  authenticate(username, password) {
    return appRequest.post('/Users/authenticate', { Username: username, Password: password });
  },
  getUsers(token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.get('/Users/get-users', config);
  },
  addUser(user, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.post('/Users/add', user, config);
  },
  editUser(user, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };

    return appRequest.put('/Users/edit', user, config);
  },
  deleteUser(user, token = localStorage.getItem('token')) {
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };
    
    return appRequest.post('/Users/delete', user, config);
  }
};
