// ==============================
// FashionAI Premium
// app.js
// ==============================

import { login } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Google Login
    // ==========================

    const googleBtn = document.getElementById("googleLogin");

    if (googleBtn) {

        googleBtn.addEventListener("click", async () => {

            const user = await login();

            if (user) {

                localStorage.setItem("fashionUser", JSON.stringify({

                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL

                }));

                window.location.href = "home.html";

            }

        });

    }

    // ==========================
    // Guest Login
    // ==========================

    const guestBtn = document.getElementById("guestLogin");

    if (guestBtn) {

        guestBtn.addEventListener("click", () => {

            localStorage.setItem("guest", "true");

            window.location.href = "home.html";

        });

    }

    // ==========================
    // Greeting
    // ==========================

    const greeting = document.getElementById("greeting");

    if (greeting) {

        const hour = new Date().getHours();

        if (hour < 12) {

            greeting.textContent = "Good Morning ☀️";

        } else if (hour < 18) {

            greeting.textContent = "Good Afternoon 🌤";

        } else {

            greeting.textContent = "Good Evening 🌙";

        }

    }

    // ==========================
    // Card Animation
    // ==========================

    document.querySelectorAll(".card,.hero-card").forEach((card, index) => {

        card.style.opacity = "0";

        setTimeout(() => {

            card.classList.add("fade-in");

            card.style.opacity = "1";

        }, index * 150);

    });

    // ==========================
    // Navigation
    // ==========================

    document.querySelectorAll("nav button").forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll("nav button").forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

        });

    });

    console.log("✨ FashionAI Premium Started");

});

// ==============================
// Service Worker
// ==============================

if ("serviceWorker" in navigator") {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(() => {

                console.log("✅ PWA Ready");

            })
            .catch(console.error);

    });

}
