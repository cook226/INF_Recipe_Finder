// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFAoS5FcqLjXT7xIXr5MB1uEEnjCiCxjs",
    authDomain: "recipe-finder-62340.firebaseapp.com",
    projectId: "recipe-finder-62340",
    storageBucket: "recipe-finder-62340.appspot.com",
    messagingSenderId: "991660866910",
    appId: "1:991660866910:web:178f186cea385bd93b63cf",
    measurementId: "G-GZ7MQ2YZFJ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };