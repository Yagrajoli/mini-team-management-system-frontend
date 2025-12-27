import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

//== Global error handler for API failures  ==// 
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string })?.message || error.message;

    //== Handle specific error codes ==//
    switch (status) {
      case 401:
        console.error('Unauthorized - Please log in again');
        break;
      case 403:
        console.error('Forbidden - You do not have permission');
        break;
      case 404:
        console.error('Resource not found');
        break;
      case 500:
        console.error('Server error - Please try again later');
        break;
      default:
        console.error(`API Error: ${message}`);
    }

    
    return Promise.reject(error);
  }
);