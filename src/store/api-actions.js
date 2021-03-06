import {ActionCreator} from "./action";

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);
