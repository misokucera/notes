import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";
import "./index.css";

var config = {
    apiKey: "AIzaSyCwSYqDST9fMa0SNPW6OJAhBB1AbT_F2JM",
    authDomain: "dashboard-6d455.firebaseapp.com",
    databaseURL: "https://dashboard-6d455.firebaseio.com",
    projectId: "dashboard-6d455",
    storageBucket: "dashboard-6d455.appspot.com",
    messagingSenderId: "765132708082"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
