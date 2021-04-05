import {createReducer} from '@reduxjs/toolkit';
import {selectCity, selectOffer, selectSortOption} from "../action";

const initialState = {
  city: {
    name: `Paris`,
  },
  offersCount: 0,
  offersFiltered: [],
  sortOption: {name: `Popular`, id: 0},
  activeOffer: {},
  locations: [
    {
      name: `Paris`,
      id: 1,
    },
    {
      name: `Cologne`,
      id: 2,
    },
    {
      name: `Brussels`,
      id: 3,
    },
    {
      name: `Amsterdam`,
      id: 4,
    },
    {
      name: `Hamburg`,
      id: 5,
    },
    {
      name: `Dusseldorf`,
      id: 6,
    }
  ]
};

const appProcess = createReducer(initialState, (builder) => {
  builder.addCase(selectCity, (state, action) => {
    state.city.name = action.payload;
  });
  builder.addCase(selectSortOption, (state, action) => {
    state.sortOption = action.payload;
  });
  builder.addCase(selectOffer, (state, action) => {
    state.activeOffer = action.payload;
  });
});


export {appProcess};
