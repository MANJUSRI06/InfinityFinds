// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAdw0fLxCE78LGyGM87CH-DPGcTespnksk",
    authDomain: "infinityfinds-cb740.firebaseapp.com",
    projectId: "infinityfinds-cb740",
    storageBucket: "infinityfinds-cb740.firebasestorage.app",
    messagingSenderId: "931838511176",
    appId: "1:931838511176:web:0e649bad2e6f51e08ef07d"
};

// Initialize Firebase
console.log("Initializing Firebase with config:", firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
