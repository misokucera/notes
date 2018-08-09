import React from "react";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import firebase from 'firebase';

class Logout extends React.Component {
    state = {
      redirect: false
    };

    logout() {
        firebase.auth().signOut().then(
            () => this.setState({redirect: true})
        );
    }

    render() {
        return this.state.redirect
            ? <Redirect to={{ pathname: "/login" }} />
            : <Button color='inherit' onClick={() => this.logout()}>Logout</Button>
    }
}

export default Logout;