import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import PrivateRoute from './pages/PrivateRoute';
import "typeface-roboto";

const App = () => (
    <Router>
        <div>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={List} />
        </div>
    </Router>
);

export default App;