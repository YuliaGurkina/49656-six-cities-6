import axios from "axios";
import humps from 'humps';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;


export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
    transformResponse: [
      ...axios.defaults.transformResponse,
      (data) => humps.camelizeKeys(data)
    ],
    transformRequest: [
      (data) => humps.decamelizeKeys(data),
      ...axios.defaults.transformRequest
    ]
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
