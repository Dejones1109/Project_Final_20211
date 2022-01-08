import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDLhWqWKZ-RYs6bxFZX2W8-UblSx15EA4c",
    authDomain: "papa-dashi.firebaseapp.com",
    databaseURL: "https://papa-dashi-default-rtdb.firebaseio.com",
    projectId: "papa-dashi",
    storageBucket: "papa-dashi.appspot.com",
    messagingSenderId: "315362322015",
    appId: "1:315362322015:web:795e04c693203f25685dea"
};
export const app = firebase.initializeApp(firebaseConfig);
export const database = app.database();
