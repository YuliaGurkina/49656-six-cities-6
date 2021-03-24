import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import rootReducer from "./store/root-reducer";
import {Provider} from "react-redux";
import {createAPI} from "./services/api";
import {configureStore} from '@reduxjs/toolkit';
import {requireAuthorization} from "./store/action";
import {AuthorizationStatus} from "./const";
import {checkAuth} from "./store/api-actions";
import {redirect} from "./store/middlewares/redirect";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
      <ToastContainer />
    </Provider>,
    document.querySelector(`#root`)
);

