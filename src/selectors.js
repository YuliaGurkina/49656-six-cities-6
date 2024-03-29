import {createSelector} from "reselect";
import {NameSpace} from "./store/root-reducer";

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};
export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};
export const getFavorite = (state) => {
  return state[NameSpace.DATA].favorite;
};
export const getOffer = (state) => {
  return state[NameSpace.DATA].offer;
};
export const getNearbyOffer = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getCity = (state) => state[NameSpace.PROCESS].city.name;
export const getSortOption = (state) => state[NameSpace.PROCESS].sortOption;
export const getLocations = (state) => state[NameSpace.PROCESS].locations;

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
            return b.rating - a.rating;
          });
      }

      return offersByCitySort;
    }
);

export const getOffersGroupedByCity = createSelector(
    getFavorite,
    getLocations,
    (favorite, locations) => {
      let offersGroupedByCity = [];
      if (favorite.length) {
        locations.forEach((location) => {
          offersGroupedByCity[location.id] = favorite.filter((item) => item.city.name === location.name);
        });
      }
      return offersGroupedByCity;
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
