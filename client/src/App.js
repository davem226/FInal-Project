import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { NoMatch } from "./pages/NoMatch";

export const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route component={NoMatch} />
        </Switch>
    </Router>
);