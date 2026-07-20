// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHHo0Euko772gNpb2wZFMUe1Xb6dZO6bg",
  authDomain: "todo-22c89.firebaseapp.com",
  databaseURL: "https://todo-22c89-default-rtdb.firebaseio.com",
  projectId: "todo-22c89",
  storageBucket: "todo-22c89.firebasestorage.app",
  messagingSenderId: "244030851396",
  appId: "1:244030851396:web:5043cb029883bb32eb6f11",
  measurementId: "G-T4M15NEE7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;