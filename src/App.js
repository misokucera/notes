import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import NewNote from "./pages/NewNote";
import PrivateRoute from './pages/PrivateRoute';
import "typeface-roboto";

const App = () => (
    <Router>
        <div>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={List} />
            <PrivateRoute exact path="/note" component={NewNote} />
            <PrivateRoute exact path="/note/:noteId" component={NewNote} />
        </div>
    </Router>
);

export default App;