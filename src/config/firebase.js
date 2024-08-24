// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS77MvVnGI3EHF63ULt7uk4tXoHfAWlkg",
  authDomain: "vite-contact-3df17.firebaseapp.com",
  projectId: "vite-contact-3df17",
  storageBucket: "vite-contact-3df17.appspot.com",
  messagingSenderId: "43301139240",
  appId: "1:43301139240:web:1ce30c71a5c08f0fc2161d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);