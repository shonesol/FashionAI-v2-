// =================================
// FashionAI Firebase Configuration
// =================================

// Import Firebase functions
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth 
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Replace these with your Firebase project details

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Authentication

export const auth = getAuth(app);
