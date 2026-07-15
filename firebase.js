// =====================================
// FashionAI Firebase
// firebase.js
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyD1__ACDdxUFjawiBr4_b6K42N-mbqe9_4",

    authDomain: "fashionai-b443e.firebaseapp.com",

    projectId: "fashionai-b443e",

    storageBucket: "fashionai-b443e.firebasestorage.app",

    messagingSenderId: "625810899658",

    appId: "1:625810899658:web:5a0cc4cd4fbf26eaeeea33"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({

    prompt: "select_account"

});

export {

    auth,

    provider,

    signInWithPopup,

    signOut,

    onAuthStateChanged

};
