// =================================
// FashionAI Clothing Vision
// =================================


import {
askGemini
}
from "./gemini-ai.js";




export async function analyzeClothing(image){



const prompt = `

You are FashionAI.

Analyze this clothing image.

Return ONLY JSON.

Format:

{
"type":"",
"category":"",
"primaryColor":"",
"secondaryColor":"",
"material":"",
"style":"",
"occasion":"",
"matchingItems":[]
}

`;




const response =
await askGemini(
prompt,
image
);



try{


return JSON.parse(
response
);


}

catch{


return {

type:"Unknown",

category:"Unknown",

primaryColor:"Unknown",

style:"Unknown"

};


}



}
