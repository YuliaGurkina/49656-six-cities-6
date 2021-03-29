import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  SELECT_CITY: `selectCity`,
  SELECT_SORT_OPTION: `selectSortOptions`,
  SELECT_OFFER: `selectOffer`,
  FILL_OFFERS: `fillOffers`,
  LOAD_OFFERS: `data/loadOffers`,
  LOAD_COMMENTS: `data/loadComments`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `game/redirectToRoute`,
};

export const selectCity = createAction(ActionType.SELECT_CITY, (city) => {
  return {
    payload: city,
  };
});

export const selectSortOption = createAction(ActionType.SELECT_SORT_OPTION, (option) => {
  return {
    payload: option,
  };
});

export const selectOffer = createAction(ActionType.SELECT_OFFER, (offer) => {
  return {
    payload: offer,
  };
});

export const fillOffers = createAction(ActionType.FILL_OFFERS, (city) => {
  return {
    payload: city,
  };
});

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => {
  return {
    payload: offers,
  };
});

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => {
  return {
    payload: comments,
  };
});

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});
