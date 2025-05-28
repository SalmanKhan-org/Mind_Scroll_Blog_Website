// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_Ix_1UBVBfvRNbcC6eroSWPEYz48oNWw",
    authDomain: "mindscroll-blog-mern.firebaseapp.com",
    projectId: "mindscroll-blog-mern",
    storageBucket: "mindscroll-blog-mern.firebasestorage.app",
    messagingSenderId: "425369545212",
    appId: "1:425369545212:web:cccb9aa917451e349b2a79",
    measurementId: "G-08YLS7PSLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };