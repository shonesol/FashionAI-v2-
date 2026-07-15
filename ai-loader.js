// =====================================
// FashionAI AI Loader
// =====================================

import FashionAI from "./fashion-ai.js";
import { getMemory } from "./memory-ai.js";
import { getStatistics } from "./fashion-memory.js";
import { getSmartRecommendation } from "./wardrobe-intelligence.js";
import { getFashionTip } from "./trend-engine.js";

class AILoader{

    constructor(){

        this.ready=false;

    }

    async initialize(){

        console.log("🧠 Loading FashionAI...");

        this.memory=getMemory();

        this.statistics=getStatistics();

        this.tip=getFashionTip();

        this.recommendation=
        await getSmartRecommendation();

        this.ready=true;

        console.log("✅ FashionAI Ready");

        return true;

    }

    async ask(question){

        if(!this.ready){

            await this.initialize();

        }

        return await FashionAI.chat(question);

    }

    async analyze(file){

        if(!this.ready){

            await this.initialize();

        }

        return await FashionAI.analyze(file);

    }

    getTip(){

        return this.tip;

    }

    getRecommendation(){

        return this.recommendation;

    }

    getStatistics(){

        return this.statistics;

    }

}

export default new AILoader();
