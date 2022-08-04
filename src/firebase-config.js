import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF-rX4GL0hjOIKCVJ2aCryXakyxv2EoXM",
    authDomain: "pixel-center-2a22f.firebaseapp.com",
    projectId: "pixel-center-2a22f",
    storageBucket: "pixel-center-2a22f.appspot.com",
    messagingSenderId: "730859832018",
    appId: "1:730859832018:web:51a36ccfd99e4fefbea30b",
    measurementId: "G-1GKNG0ML15",
    databaseURL: "https://pixel-center-2a22f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize firebase authentication
export const auth = getAuth(app);

// initialize firebase database
export const db = getDatabase(app);

// initialize firebase storage
export const storage = getStorage(app);