import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json'
    }
});

export default axiosInstance