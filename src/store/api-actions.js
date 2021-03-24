import {loadOffers, requireAuthorization, redirectToRoute} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus} from "../const";
import {toast} from 'react-toastify';
import {HttpCode} from "../services/api";

const notify = () => toast(`Incorrect Email`);

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(data)))
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
    .catch(function (error) {
      if (error.response.status === HttpCode.BAD_REQUEST) {
        notify();
      }
      return error;
    })
);
export const logOut = ({login: email, password}) => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);
