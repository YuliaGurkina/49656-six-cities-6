import axios from "axios";
import humps from 'humps';

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;
const HttpCode = {
  UNAUTHORIZED: 401,
  BADREQUEST: 400
};

export const createAPI = (onUnauthorized, onShowWarning) => {
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
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации — это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    } else {
      if (response.status === HttpCode.BADREQUEST) {
        onShowWarning();
      }
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
