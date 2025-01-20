import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', // The API (backend) URL
    withCredentials: true,
});