import React from 'react';
import Main from "../main/main";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "../login/login";
import Favorites from "../favorites/favorites";
import Property from "../property/property";
import NotFound from "../not-found/not-found";

const App = () => {

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
          <Favorites/>
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

export default App;
