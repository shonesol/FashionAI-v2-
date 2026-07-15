// =====================================
// FashionAI Hybrid Engine
// =====================================

import { analyzeClothing } from "./clothing-analyzer.js";
import { processRequest } from "./fashion-brain.js";

class FashionAI{

    async analyze(file){

        return await analyzeClothing(file);

    }

    async chat(message){

        return await processRequest(message);

    }

    async suggestOutfit(occasion){

        return await processRequest(

            "outfit " + occasion

        );

    }

    async wardrobeSummary(clothes){

        return{

            total:clothes.length,

            shirts:clothes.filter(c=>c.category==="Shirt").length,

            tshirts:clothes.filter(c=>c.category==="T-Shirt").length,

            dresses:clothes.filter(c=>c.category==="Dress").length,

            pants:clothes.filter(c=>c.category==="Pants").length,

            skirts:clothes.filter(c=>c.category==="Skirt").length,

            jackets:clothes.filter(c=>c.category==="Jacket").length,

            shoes:clothes.filter(c=>c.category==="Shoes").length

        };

    }

}

export default new FashionAI();
