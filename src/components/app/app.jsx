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
import PropTypes from "prop-types";

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
        <Route exact path={`${AppRoute.OFFER}/:id`} render={(props) => <Property id={props.match.params.id}/>} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  }),
};

export default App;
