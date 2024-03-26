// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsNinz8iN9RnYB2TWCn6JaXgDdTfLrAGs",
    authDomain: "react-login-7e356.firebaseapp.com",
    projectId: "react-login-7e356",
    storageBucket: "react-login-7e356.appspot.com",
    messagingSenderId: "1095668470085",
    appId: "1:1095668470085:web:1234fe74296c7f104f2e2c"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);