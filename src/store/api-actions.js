import {loadOffers, requireAuthorization, redirectToRoute, loadComments, loadOffer} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus} from "../const";
import {toast} from 'react-toastify';
import {HttpCode} from "../services/api";

const notify = () => toast(`Неправильный запрос. Проверьте данные.`);

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(loadOffers(data)))
    .catch(function (error) {
      dispatch(loadOffers([]));
      return error;
    })
);

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadOffer(data)))
    .catch(function (error) {
      if (error.response.status === HttpCode.NOT_FOUND) {
        dispatch(loadOffer([]));
      }
      return error;
    })
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

export const fetchCommentsList = ({hotelId: id}) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMETS}/${id}`, {id})
    .then(({data}) => dispatch(loadComments(data)))
);

export const commentPost = ({id, comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMETS}/${id}`, {comment, rating})
    .catch(function (error) {
      if (error.response.status === HttpCode.BAD_REQUEST) {
        notify();
      }
      return error;
    })
);
