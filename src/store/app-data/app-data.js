import {createReducer} from '@reduxjs/toolkit';
import {loadComments, loadOffers} from '../action';

const initialState = {
  offers: [],
  comments: [],
  isDataLoaded: false
};

const appData = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.isDataLoaded = true;
    state.offers = action.payload;
  });
  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
  });
});

export {appData};
