// axiosInstance.js
import axios from 'axios';
import { api_url } from './config';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: api_url, // Replace with your API base URL
  timeout: 10000, // Set a timeout limit
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Access localStorage safely by checking if window is defined
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process the response data here
    return response;
  },
  (error) => {
    // Handle response error

    console.log(error)
    if (error.response && error.response.status === 401) {
      // Example: handle unauthorized access
      console.error('Unauthorized access - redirecting to login');
      // Redirect to login or show a message
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
