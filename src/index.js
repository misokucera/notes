import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";
import "./index.css";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
