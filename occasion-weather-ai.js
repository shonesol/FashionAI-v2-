// =====================================
// FashionAI Occasion + Weather AI
// occasion-weather-ai.js
// =====================================

import { getAllClothes } from "./db.js";

export async function suggestOutfit(weather, occasion){

    const clothes = await getAllClothes();

    const clean = clothes.filter(item =>
        item.laundryStatus === "Clean"
    );

    const suitable = clean.filter(item => {

        const seasonMatch =
            !item.season ||
            item.season === "All Season" ||
            item.season === weather;

        const occasionMatch =
            !item.occasion ||
            item.occasion === occasion;

        return seasonMatch && occasionMatch;

    });

    return {

        weather,
        occasion,
        total:suitable.length,
        clothes:suitable

    };

}

export function weatherMessage(weather){

    switch(weather){

        case "Sunny":
            return "☀️ Light and breathable clothes are recommended.";

        case "Rainy":
            return "🌧 A jacket and waterproof shoes are recommended.";

        case "Cold":
            return "❄ Wear warm clothing and closed shoes.";

        case "Cloudy":
            return "☁️ A light sweater or jacket is a good choice.";

        default:
            return "✨ Dress comfortably and enjoy your day.";

    }

}

export function occasionMessage(occasion){

    switch(occasion){

        case "Office":
            return "👔 Professional and neat outfits work best.";

        case "Wedding":
            return "💍 Elegant and formal clothing is recommended.";

        case "Party":
            return "🎉 Wear something stylish and eye-catching.";

        case "Travel":
            return "✈ Comfortable clothes and shoes are best.";

        default:
            return "😊 Casual outfits are a great choice.";

    }

}
