import appRequest from './AppRequest';

export default {
  authenticate(username, password) {
    return appRequest
      .post('/Users/authenticate', { Username: username, Password: password })
  }
}
