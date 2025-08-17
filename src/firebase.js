// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKAvdJzGJ8l6r5mKPAQfvFUF1epu2EdLg",
  authDomain: "crud-app-14e5d.firebaseapp.com",
  projectId: "crud-app-14e5d",
  storageBucket: "crud-app-14e5d.firebasestorage.app",
  messagingSenderId: "410911193079",
  appId: "1:410911193079:web:247347d7b3a881cfbc60f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };