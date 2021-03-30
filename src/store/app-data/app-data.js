import {createReducer} from '@reduxjs/toolkit';
import {loadComments, loadFavorite, loadOffer, loadOffers} from '../action';

const initialState = {
  offers: [],
  comments: [],
  isDataLoaded: false,
  isDataOfferLoaded: false,
  offer: [],
  favorite: []
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
  builder.addCase(loadFavorite, (state, action) => {
    state.favorite = action.payload;
  });
});

export {appData};
