// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdJHNCUHNQrORJXbltPhxVrGge_3woavU",
  authDomain: "netflix-gpt-c1890.firebaseapp.com",
  projectId: "netflix-gpt-c1890",
  storageBucket: "netflix-gpt-c1890.appspot.com",
  messagingSenderId: "563022141848",
  appId: "1:563022141848:web:8305a4ce04d388c74c33ed",
  measurementId: "G-63DWJE756T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();