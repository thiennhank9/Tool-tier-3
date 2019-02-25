import axios from 'axios';
import { isNil, isEmpty } from 'lodash';

const tokenStorage = localStorage.getItem('token');
const isUsingToken = !isNil(tokenStorage) && !isEmpty(tokenStorage);

export default axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: !isUsingToken
    ? {
        'Content-Type': 'application/json'
      }
    : {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + tokenStorage
      }
});
