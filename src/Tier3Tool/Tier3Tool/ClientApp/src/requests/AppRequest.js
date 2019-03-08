import axios from 'axios';

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  console.log(error)
 }
 return error;
});

export default axios.create({
  baseURL: '/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});
