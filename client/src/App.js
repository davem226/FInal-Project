import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Signup, Home, NoMatch } from "./pages";

export const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/:id" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    </Router>
);