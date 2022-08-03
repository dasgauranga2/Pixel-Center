import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF-rX4GL0hjOIKCVJ2aCryXakyxv2EoXM",
    authDomain: "pixel-center-2a22f.firebaseapp.com",
    projectId: "pixel-center-2a22f",
    storageBucket: "pixel-center-2a22f.appspot.com",
    messagingSenderId: "730859832018",
    appId: "1:730859832018:web:51a36ccfd99e4fefbea30b",
    measurementId: "G-1GKNG0ML15"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize firebase database
export const auth = getAuth(app);