// =====================================
// FashionAI Authentication
// auth.js
// =====================================

import {
    auth,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "./firebase.js";

const googleBtn = document.getElementById("googleLogin");
const guestBtn = document.getElementById("guestLogin");
const logoutBtn = document.getElementById("logoutBtn");


// =====================================
// Google Sign In
// =====================================

export async function loginWithGoogle(){

    try{

        const result = await signInWithPopup(
            auth,
            provider
        );

        const user = result.user;

        localStorage.setItem(
            "fashionai_user",
            JSON.stringify({
                uid:user.uid,
                name:user.displayName,
                email:user.email,
                photo:user.photoURL
            })
        );

        window.location.href = "home.html";

    }catch(error){

        console.error(error);

        alert("Google Sign-In failed.");

    }

}


// =====================================
// Guest Login
// =====================================

export function loginAsGuest(){

    localStorage.setItem(
        "fashionai_guest",
        "true"
    );

    window.location.href="home.html";

}


// =====================================
// Logout
// =====================================

export async function logout(){

    try{

        await signOut(auth);

    }catch(e){

        console.log(e);

    }

    localStorage.removeItem("fashionai_user");
    localStorage.removeItem("fashionai_guest");

    window.location.href="index.html";

}


// =====================================
// Authentication State
// =====================================

onAuthStateChanged(auth,user=>{

    if(user){

        console.log(
            "✅ Logged in:",
            user.displayName
        );

        const profileName =
        document.getElementById("profileName");

        if(profileName){

            profileName.textContent =
            user.displayName;

        }

        const profilePhoto =
        document.getElementById("profilePhoto");

        if(profilePhoto){

            profilePhoto.src =
            user.photoURL;

        }

    }else{

        console.log("No authenticated user.");

    }

});


// =====================================
// Buttons
// =====================================

if(googleBtn){

    googleBtn.addEventListener(
        "click",
        loginWithGoogle
    );

}

if(guestBtn){

    guestBtn.addEventListener(
        "click",
        loginAsGuest
    );

}

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        logout
    );

}
