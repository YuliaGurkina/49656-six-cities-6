import {createReducer} from '@reduxjs/toolkit';
import {selectCity} from "../action";

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
});


export {appProcess};
