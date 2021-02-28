import React from 'react';
import PropTypes from 'prop-types';
import Main from "../main/main";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import NotFound from "../not-found/not-found";
import offerProp from "./offer.prop";

const App = (props) => {
  const {offers} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites offers={offers}/>
        </Route>
        <Route exact path="/offer/:id">
          <Property />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default App;
