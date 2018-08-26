import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login";
import List from "./components/List";
import Note from "./components/Note";
import PrivateRoute from './components/PrivateRoute';
import "typeface-roboto";

const App = () => (
    <Router>
        <div>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={List} />
            <PrivateRoute exact path="/note" component={Note} />
            <PrivateRoute exact path="/note/:noteId" component={Note} />
        </div>
    </Router>
);

export default App;