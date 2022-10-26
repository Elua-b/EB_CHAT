// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvXdgtMAgbpYdNSv0e-4Mx2ojboX0yNKc",
  authDomain: "eb-chat-78a28.firebaseapp.com",
  projectId: "eb-chat-78a28",
  storageBucket: "eb-chat-78a28.appspot.com",
  messagingSenderId: "1091075104577",
  appId: "1:1091075104577:web:d636a265e7e83d55864bc0",
  measurementId: "G-X865EP6BPT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const  storage=getStorage();
export const db=getFirestore();