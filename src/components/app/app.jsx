import React from 'react';
import Main from "../main/main";
import {Router as BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import NotFound from "../not-found/not-found";
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";

const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login />
        </Route>
        <PrivateRoute exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.OFFER}/:id`}>
          <Property />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
