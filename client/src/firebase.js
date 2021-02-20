import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYtTtqI43cdNdC0amOAwRdU7J8WSvVzZc",
    authDomain: "pc-hub-3d208.firebaseapp.com",
    databaseURL: "https://pc-hub-3d208.firebaseio.com",
    projectId: "pc-hub-3d208",
    storageBucket: "pc-hub-3d208.appspot.com",
    messagingSenderId: "1038539090220",
    appId: "1:1038539090220:web:14bc0c93dae144e467a489",
    measurementId: "G-NZ31EK5GZX"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();