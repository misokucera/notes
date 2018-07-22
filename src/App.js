import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Note from "./pages/Note";
import PrivateRoute from './pages/PrivateRoute';
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