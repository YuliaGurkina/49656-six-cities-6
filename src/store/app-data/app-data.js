import {createReducer} from '@reduxjs/toolkit';
import {loadComments, loadOffer, loadOffers} from '../action';

const initialState = {
  offers: [],
  comments: [],
  isDataLoaded: false,
  isDataOfferLoaded: false,
  offer: []
};

const appData = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.isDataLoaded = true;
    state.offers = action.payload;
  });
  builder.addCase(loadOffer, (state, action) => {
    state.isDataOfferLoaded = true;
    state.offer = action.payload;
  });
  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
  });
});

export {appData};
