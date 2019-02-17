import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});