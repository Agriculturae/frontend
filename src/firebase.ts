// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA3pN0t-vJ_4NdyITRQFU2rFfJp1VYonjg",
  authDomain: "agriculturae-db.firebaseapp.com",
  projectId: "agriculturae-db",
  storageBucket: "agriculturae-db.appspot.com",
  messagingSenderId: "705252617282",
  appId: "1:705252617282:web:44477b255d063dab6f51db",
  measurementId: "G-Q12PXZPQKK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
