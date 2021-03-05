import {ActionType} from './action';
import {getOffersByCity, getOffersCount} from "../selectors";

const initialState = {
  city: {
    name: `Paris`,
  },
  offers: [],
  offersCount: 0,
  offersFiltered: [],
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_CITY:
      return {
        ...state,
        city: {
          ...state.city,
          name: action.payload
        }
      };
    case ActionType.FILL_OFFERS:
      return {
        ...state,
        offersFiltered: getOffersByCity(state),
        offersCount: getOffersCount(state),
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };
  }

  return state;
};


export {reducer};
