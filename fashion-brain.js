// =====================================
// FashionAI Brain
// Hybrid Offline Intelligence
// =====================================

import { askFashionAI } from "./assistant.js";
import { generateOutfit } from "./outfit-engine.js";
import { colorsMatch } from "./color-engine.js";
import { getStyleRule } from "./style-engine.js";
import { getMemory, rememberOutfit } from "./memory-ai.js";

export async function processRequest(message){

    message = message.toLowerCase();

    // Outfit Request
    if(
        message.includes("outfit") ||
        message.includes("wear")
    ){

        let occasion = "Casual";

        if(message.includes("office")) occasion = "Office";
        else if(message.includes("party")) occasion = "Party";
        else if(message.includes("wedding")) occasion = "Wedding";
        else if(message.includes("travel")) occasion = "Travel";

        const outfit = await generateOutfit(occasion);

        if(outfit.success){

            rememberOutfit(outfit);

            return{
                source:"offline",
                type:"outfit",
                data:outfit
            };

        }

        return{
            source:"offline",
            reply:outfit.message
        };

    }

    // Color Matching
    if(
        message.includes("match") ||
        message.includes("color")
    ){

        return{
            source:"offline",
            reply:"FashionAI can match colors using its built-in color engine."
        };

    }

    // Style Rules
    if(message.includes("office")){

        return{
            source:"offline",
            data:getStyleRule("Office")
        };

    }

    // Memory
    if(message.includes("memory")){

        return{
            source:"offline",
            data:getMemory()
        };

    }

    // Default Assistant
    return await askFashionAI(message);

}
