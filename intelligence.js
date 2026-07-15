// =====================================
// FashionAI Wardrobe Intelligence
// wardrobe-intelligence.js
// =====================================

import { getAllClothes } from "./db.js";

export async function getWardrobeInsights(){

    const clothes = await getAllClothes();

    const insights = {

        total: clothes.length,

        clean: 0,

        dirty: 0,

        favorites: 0,

        colors: {},

        categories: {},

        occasions: {}

    };

    clothes.forEach(item=>{

        // Laundry
        if(item.laundryStatus==="Clean")
            insights.clean++;
        else
            insights.dirty++;

        // Favorites
        if(item.favorite)
            insights.favorites++;

        // Colors
        const color=item.primaryColor||"Unknown";
        insights.colors[color]=(insights.colors[color]||0)+1;

        // Categories
        const category=item.category||"Other";
        insights.categories[category]=(insights.categories[category]||0)+1;

        // Occasions
        const occasion=item.occasion||"Casual";
        insights.occasions[occasion]=(insights.occasions[occasion]||0)+1;

    });

    return insights;

}

export async function getSmartRecommendation(){

    const insights = await getWardrobeInsights();

    if(insights.clean===0){

        return "🧺 All your clothes are marked as dirty. Time to do some laundry.";

    }

    if(insights.total<10){

        return "👕 Your wardrobe is still small. Consider adding more clothing.";

    }

    if(insights.favorites===0){

        return "❤️ Mark your favorite clothes for quicker outfit suggestions.";

    }

    return "✨ Your wardrobe looks great! Try generating an outfit today.";

}
