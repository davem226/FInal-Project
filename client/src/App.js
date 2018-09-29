import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Signup, Profile, NoMatch } from "./pages";

export const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/:id" component={Profile} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>
);