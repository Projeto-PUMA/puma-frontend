import axios from 'axios';

import toCamelCase from '../helpers/toCamelCase';

const formatApiResult = (result) => {
  if (result.status >= 200 && result.status < 300) {
    return {
      data: result.data,
      status: result.status,
    };
  } if (result.response) {
    return {
      data: result.response.data,
      status: result.response.status,
    };
  }
  return {
    data: result.request,
    status: 0,
  };
};

const createAxiosService = () => {
  const timeout = 140000;

  const baseURL = 'http://164.41.9.93:3000/api';

  const axiosService = axios.create({ baseURL, timeout });
  
  axiosService.interceptors.response.use(
    response => formatApiResult(toCamelCase(response)),
    error => formatApiResult(toCamelCase(error)),
  );

  return axiosService;
};

const pumaApi = createAxiosService();

export default pumaApi;
