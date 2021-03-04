import {createSelector} from "reselect";

export const getOffers = (state) => {
  return state.offers;
};

export const getCity = (state) => {
  return state.city.name;
};

export const getOffersByCity = createSelector(
    getOffers,
    getCity,
    (offers, city) => {
      return offers.filter((item) => item.city.name === city);
    }
);

export const getOffersCount = createSelector(
    getOffers,
    getCity,
    (offers, city) => {
      let count = 0;
      offers.map((item) => {
        if (item.city.name === city) {
          count = count + 1;
        }
      });

      return count;
    }
);
