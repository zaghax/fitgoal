import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage' 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNV1rShRS6iO1KSZiGcIqb8eW-dBddPuY",
    authDomain: "fitgoal-58580.firebaseapp.com",
    projectId: "fitgoal-58580",
    storageBucket: "fitgoal-58580.appspot.com",
    messagingSenderId: "307601706632",
    appId: "1:307601706632:web:5c4a1facd2965069bc193d"
  };

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const fbStorage = fb.storage().ref();