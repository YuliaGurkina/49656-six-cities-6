import {AuthorizationStatus} from '../../const';
import {createReducer} from "@reduxjs/toolkit";
import {requireAuthorization, loadUserData} from "../action";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isLoading: true,
  user: {},
  isUserDataLoaded: false
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload,
      isLoading: false,
    };
  });
  builder.addCase(loadUserData, (state, action) => {
    state.user = action.payload;
    state.isUserDataLoaded = true;
  });
});

export {user};
