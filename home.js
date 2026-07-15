// =====================================
// FashionAI Premium Dashboard
// =====================================

import { getAllClothes } from "./db.js";
import FashionAI from "./fashion-ai.js";

document.addEventListener("DOMContentLoaded", async () => {

    await loadDashboard();

    loadGreeting();

    loadStatistics();

});

async function loadDashboard(){

    const clothes = await getAllClothes();

    // Total Clothes
    const total = document.getElementById("totalClothes");

    if(total){

        total.textContent = clothes.length;

    }

    // Favorite Clothes
    const favorites = clothes.filter(item => item.favorite);

    const favoriteCount = document.getElementById("favoriteCount");

    if(favoriteCount){

        favoriteCount.textContent = favorites.length;

    }

    // Clean Clothes
    const clean = clothes.filter(item =>
        item.laundryStatus === "Clean"
    );

    const cleanCount = document.getElementById("cleanCount");

    if(cleanCount){

        cleanCount.textContent = clean.length;

    }

    // AI Summary
    const summary = await FashionAI.wardrobeSummary(clothes);

    console.log(summary);

}

function loadGreeting(){

    const greeting = document.getElementById("greeting");

    if(!greeting) return;

    const hour = new Date().getHours();

    if(hour < 12){

        greeting.textContent = "☀️ Good Morning";

    }else if(hour < 18){

        greeting.textContent = "🌤 Good Afternoon";

    }else{

        greeting.textContent = "🌙 Good Evening";

    }

}

function loadStatistics(){

    const today = document.getElementById("todayDate");

    if(today){

        today.textContent =
            new Date().toDateString();

    }

}
