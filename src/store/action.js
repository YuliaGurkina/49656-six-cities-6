export const ActionType = {
  SELECT_CITY: `selectCity`,
  FILL_OFFERS: `fillOffers`,
  LOAD_OFFERS: `data/loadOffers`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `game/redirectToRoute`,
};

export const selectCity = (city) => ({
  type: ActionType.SELECT_CITY,
  payload: city,
});

export const fillOffers = (city) => ({
  type: ActionType.FILL_OFFERS,
  payload: city,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

