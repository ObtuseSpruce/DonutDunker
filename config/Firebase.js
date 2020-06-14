import firebase from 'firebase'
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID
} from 'react-native-dotenv'

var firebaseConfig = {
    apiKey: "AIzaSyBqfAH4WaunH5hNBeEB7EJhMndgrqa02GM",
    authDomain: "willfirebasetest.firebaseapp.com",
    databaseURL: "https://willfirebasetest.firebaseio.com",
    projectId: "willfirebasetest",
    storageBucket: '',
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: "1:81353748464:web:a509aa40615dff95507735"
  }; 

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase