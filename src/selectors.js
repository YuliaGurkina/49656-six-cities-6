import {createSelector} from "reselect";
import {NameSpace} from "./store/root-reducer";

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};
export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};
export const getOffer = (state) => {
  return state[NameSpace.DATA].offer;
};

export const getCity = (state) => state[NameSpace.PROCESS].city.name;
export const getSortOption = (state) => state[NameSpace.PROCESS].sortOption;

export const getOffersByCity = createSelector(
    getOffers,
    getCity,
    getSortOption,
    (offers, city, sortOption) => {
      const offersByCity = offers.filter((item) => item.city.name === city);
      if (sortOption.id === 0) {
        return offersByCity;
      }

      const offersByCitySort = offers.slice(0);

      switch (sortOption.id) {
        case 1:
          offersByCitySort.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        case 2:
          offersByCitySort.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case 3:
          offersByCitySort.sort((a, b) => {
            return a.rating - b.rating;
          });
      }

      return offersByCitySort;
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
