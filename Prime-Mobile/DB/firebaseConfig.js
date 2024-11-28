import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore para perguntas

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyColq8nh741FW-DeAVRdc77ZcC9FP-Blp8",
    authDomain: "teste-denovo-1d43c.firebaseapp.com",
    projectId: "teste-denovo-1d43c",
    storageBucket: "teste-denovo-1d43c.appspot.com",
    messagingSenderId: "384646857934",
    appId: "1:384646857934:web:70f54a0c677d602d03fc9f",
    measurementId: "G-E9FET4BYVZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Autenticação
const db = getFirestore(app); // Firestore

export { auth, db };

