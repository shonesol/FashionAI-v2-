// // firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1__ACDdxUFjawiBr4_b6K42N-mbqe9_4",
    authDomain: "fashionai-b443e.firebaseapp.com",
    projectId: "fashionai-b443e",
    storageBucket: "fashionai-b443e.firebasestorage.app",
    messagingSenderId: "625810899658",
    appId: "1:625810899658:web:5a0cc4cd4fbf26eaeeea33"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function login() {

    try {

        const result = await signInWithPopup(auth, provider);

        return result.user;

    } catch (error) {

        console.error(error);

        alert(error.message);

        return null;
    }

}

export async function logout() {

    await signOut(auth);

}
