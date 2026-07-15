// =====================================
// FashionAI Premium
// app.js
// =====================================

import { loadWardrobe } from "./wardrobe.js";
import { startListening } from "./voice-assistant.js";

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

function initializeApp(){

    initializeNavigation();

    initializeTheme();

    initializeButtons();

    loadGreeting();

    loadCurrentDate();

    loadWardrobe();

    registerServiceWorker();

    console.log("✅ FashionAI Started");

}

// =====================================
// Navigation
// =====================================

function initializeNavigation(){

    const buttons =
    document.querySelectorAll(".nav-btn");

    const pages =
    document.querySelectorAll(".page");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const page =
            button.dataset.page;

            buttons.forEach(btn=>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            pages.forEach(section=>{

                section.classList.remove("active");

            });

            const selected =
            document.getElementById(page);

            if(selected){

                selected.classList.add("active");

            }

            if(page==="wardrobe"){

                loadWardrobe();

            }

        });

    });

}

// =====================================
// Greeting
// =====================================

function loadGreeting(){

    const greeting =
    document.getElementById("greeting");

    if(!greeting) return;

    const hour =
    new Date().getHours();

    if(hour<12){

        greeting.textContent="☀️ Good Morning";

    }else if(hour<18){

        greeting.textContent="🌤 Good Afternoon";

    }else{

        greeting.textContent="🌙 Good Evening";

    }

}

// =====================================
// Date
// =====================================

function loadCurrentDate(){

    const today =
    document.getElementById("todayDate");

    if(today){

        today.textContent =
        new Date().toDateString();

    }

}
// =====================================
// Theme Manager
// =====================================

function initializeTheme(){

const themeBtn =
document.getElementById("themeBtn");

if(!themeBtn) return;

const savedTheme =
localStorage.getItem("fashionai_theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const dark =
document.body.classList.contains("dark");

localStorage.setItem(

"fashionai_theme",

dark ? "dark" : "light"

);

themeBtn.textContent =
dark ? "☀️" : "🌙";

});

}



// =====================================
// Buttons
// =====================================

function initializeButtons(){

const uploadBtn =
document.getElementById("startUploadBtn");

if(uploadBtn){

uploadBtn.addEventListener("click",()=>{

openPage("upload");

});

}

const voiceBtn =
document.getElementById("voiceBtn");

if(voiceBtn){

voiceBtn.addEventListener("click",()=>{

startListening();

});

}

const menuBtn =
document.getElementById("menuBtn");

const nav =
document.getElementById("mainNav");

if(menuBtn && nav){

menuBtn.addEventListener("click",()=>{

nav.classList.toggle("show");

});

}

}



// =====================================
// Open Page
// =====================================

function openPage(page){

document.querySelectorAll(".page")
.forEach(section=>{

section.classList.remove("active");

});

document.querySelectorAll(".nav-btn")
.forEach(btn=>{

btn.classList.remove("active");

});

const selected =
document.getElementById(page);

if(selected){

selected.classList.add("active");

}

const navButton =
document.querySelector(

`.nav-btn[data-page="${page}"]`

);

if(navButton){

navButton.classList.add("active");

}

if(page==="wardrobe"){

loadWardrobe();

}

}



// =====================================
// Service Worker
// =====================================

function registerServiceWorker(){

if(!("serviceWorker" in navigator))
return;

window.addEventListener("load",()=>{

navigator.serviceWorker

.register("sw.js")

.then(()=>{

console.log(

"✅ PWA Ready"

);

})

.catch(error=>{

console.log(error);

});

});

}



// =====================================
// Simple Notifications
// =====================================

export function showToast(message){

const toast =
document.createElement("div");

toast.className="toast";

toast.textContent=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.remove();

},3000);

}
