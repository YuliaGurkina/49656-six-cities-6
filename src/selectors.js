import {createSelector} from "reselect";
import {NameSpace} from './store/root-reducer';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCity = (state) => {
  return state[NameSpace.PROCESS].city.name;
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
