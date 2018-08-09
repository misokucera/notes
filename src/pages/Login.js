import React from "react";
import Redirect from "react-router-dom/Redirect";
import firebase from "firebase";
import {StyledFirebaseAuth} from "react-firebaseui";
import firebaseui from "firebaseui";

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    // Configure FirebaseUI.
    uiConfig = {
        signInFlow: 'popup',
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({redirectToReferrer: !!user})
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        );
    }
}

export default Login;