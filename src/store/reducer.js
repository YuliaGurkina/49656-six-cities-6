import {ActionType} from './action';
import {getOffersByCity, getOffersCount} from "../selectors";
import offers from "../mocks/offers";

const initialState = {
  city: {
    name: `Paris`,
    lat: 52.38333,
    lng: 4.9,
    zoom: 12
  },
  offersCount: offers.length,
  offersFiltered: [],
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_CITY:
      return {
        ...state,
        city: {
          ...state.city,
          name: action.city
        }
      };
    case ActionType.FILL_OFFERS:
      return {
        ...state,
        offersFiltered: getOffersByCity(state),
        offersCount: getOffersCount(state),
      };
  }

  return state;
};


export {reducer};
