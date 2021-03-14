import {createSelector} from "reselect";
import {getOffers} from "./store/app-data/selectors";
import {getCity} from "./store/app-process/selectors";


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
