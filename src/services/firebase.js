// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDI5pW8voYGdwHWUaFuqmhhxK3cMctqDmY",
  authDomain: "task-manager-84535.firebaseapp.com",
  projectId: "task-manager-84535",
  storageBucket: "task-manager-84535.appspot.com",
  messagingSenderId: "431287364278",
  appId: "1:431287364278:web:6fea1aa61500e57b5ed417",
  measurementId: "G-8CSPKF5X37"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };