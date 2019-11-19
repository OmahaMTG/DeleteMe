import axios from 'axios';
import { config } from '../7_Utilities/config';

export const axiosInstance = () => {
  const headers: any = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  };

  const instance = axios.create({
    baseURL: config.apiServer,
    timeout: 15000,
    headers
  });

  instance.interceptors.request.use(async config => {
    return config;
  });

  return instance;
};
