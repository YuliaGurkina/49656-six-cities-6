export const ActionType = {
  SELECT_CITY: `selectCity`,
  FILL_OFFERS: `fillOffers`
};

export const ActionCreator = {
  selectCity: (city) => ({
    type: ActionType.SELECT_CITY,
    payload: city,
  }),
  fillOffers: (city) => ({
    type: ActionType.FILL_OFFERS,
    payload: city,
  })
};
