// =====================================
// FashionAI Clothing Analyzer
// Hybrid AI
// =====================================

import { processImage } from "./image-processor.js";
import { analyzeImage } from "./vision-engine.js";

export async function analyzeClothing(file){

    try{

        // Process image
        const image = await processImage(file);

        // Offline analysis
        const localResult = analyzeImage(image);

        // Optional online AI
        let aiResult = null;

        try{

            if(navigator.onLine){

                const response = await fetch("/api/analyze",{

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        image:image
                    })

                });

                if(response.ok){

                    aiResult = await response.json();

                }

            }

        }catch(e){

            console.log("Using offline analysis.");

        }

        return{

            success:true,

            image:image,

            analysis: aiResult || localResult,

            source: aiResult ? "online" : "offline"

        };

    }catch(error){

        console.error(error);

        return{

            success:false,

            error:error.message

        };

    }

}
