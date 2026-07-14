// ======================================
// FashionAI Hybrid Assistant
// ======================================

import { getAllClothes } from "./db.js";

export async function askFashionAI(message){

message = message.toLowerCase();

const clothes = await getAllClothes();

// Greeting

if(
message.includes("hello") ||
message.includes("hi")
){

return{
source:"offline",
reply:"👋 Hello! I'm FashionAI. How can I help you today?"
};

}

// Wardrobe Count

if(
message.includes("how many") &&
message.includes("clothes")
){

return{
source:"offline",
reply:`You currently have ${clothes.length} clothing items in your wardrobe.`
};

}

// Black Clothes

if(
message.includes("black")
){

const items = clothes.filter(item=>
(item.color || "").toLowerCase().includes("black")
);

return{
source:"offline",
reply:`I found ${items.length} black clothing items.`
};

}

// White Clothes

if(
message.includes("white")
){

const items = clothes.filter(item=>
(item.color || "").toLowerCase().includes("white")
);

return{
source:"offline",
reply:`I found ${items.length} white clothing items.`
};

}

// Default

return{

source:"offline",

reply:"😊 I'm still learning. Soon I'll answer fashion questions even better."

};

}
