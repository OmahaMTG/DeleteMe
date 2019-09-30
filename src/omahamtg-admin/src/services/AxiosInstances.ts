import axios from 'axios';

export const OmahaMTGSiteAxios = () => {
  const headers: any = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  };

  const instance = axios.create({
    baseURL: 'https://localhost:4433/api/',
    timeout: 15000,
    headers
  });

  instance.interceptors.request.use(async config => {
    return config;
  });

  return instance;
};
