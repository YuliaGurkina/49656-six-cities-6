import {ActionType} from '../action';
import {getOffersByCity, getOffersCount} from "../../selectors";

const initialState = {
  city: {
    name: `Paris`,
  },
  offersCount: 0,
  offersFiltered: [],
};

const appProcess = (state = initialState, action) => {
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
  }

  return state;
};


export {appProcess};
