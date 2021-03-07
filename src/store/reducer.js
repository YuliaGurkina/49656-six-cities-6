import {ActionType} from './action';
import {getOffersByCity, getOffersCount} from "../selectors";
import {AuthorizationStatus} from "../const";

const initialState = {
  city: {
    name: `Paris`,
  },
  offers: [],
  offersCount: 0,
  offersFiltered: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
  }

  return state;
};


export {reducer};
