import {ActionType} from '../action';

const initialState = {
  offers: [],
  isDataLoaded: false
};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };
  }

  return state;
};

export {appData};
