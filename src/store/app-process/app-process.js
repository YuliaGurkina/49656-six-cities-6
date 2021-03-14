import {createReducer} from '@reduxjs/toolkit';
import {getOffersByCity, getOffersCount} from "../../selectors";
import {fillOffers, selectCity} from "../action";

const initialState = {
  city: {
    name: `Paris`,
  },
  offersCount: 0,
  offersFiltered: [],
};

const appProcess = createReducer(initialState, (builder) => {
  builder.addCase(selectCity, (state, action) => {
    state.city.name = action.payload;
  });
  builder.addCase(fillOffers, (state) => {
    state.offersFiltered = getOffersByCity(state);
    state.offersCount = getOffersCount(state);
  });
});


export {appProcess};
