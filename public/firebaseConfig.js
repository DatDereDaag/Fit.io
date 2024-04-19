// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBFto7heT_KyaOiiqtCyt_2cJa64LV1nNE",
  authDomain: "fit-io-9d821.firebaseapp.com",
  projectId: "fit-io-9d821",
  storageBucket: "fit-io-9d821.appspot.com",
  messagingSenderId: "859691346592",
  appId: "1:859691346592:web:132d2242e153a102d277c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const usersRef = ref(db, 'users');

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", register);

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", login);

function register(){
  // Get input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Add to Firebase
      const userData = {
        email: email,
        last_login: Date.now()
      };

      set(ref(usersRef, user.uid), userData);

      alert('Account Created!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function login(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      const userData = {
        last_login: Date.now()
      };

      update(ref(usersRef, user.uid), userData);

      alert('User Logged In!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}