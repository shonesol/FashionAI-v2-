// =====================================
// FashionAI Memory System
// fashion-memory.js
// =====================================

const MEMORY_KEY = "fashionai_memory_v2";

export function loadMemory(){

const memory = localStorage.getItem(MEMORY_KEY);

if(memory){

return JSON.parse(memory);

}

return{

favoriteColors:[],

favoriteCategories:[],

favoriteOccasions:[],

favoriteStyles:[],

recentSearches:[],

recentOutfits:[],

lastRecommendation:null,

totalUploads:0,

totalOutfitsGenerated:0,

totalChats:0

};

}

export function saveMemory(memory){

localStorage.setItem(

MEMORY_KEY,

JSON.stringify(memory)

);

}

export function recordUpload(clothing){

const memory = loadMemory();

memory.totalUploads++;

if(clothing.primaryColor){

memory.favoriteColors.push(

clothing.primaryColor

);

}

if(clothing.category){

memory.favoriteCategories.push(

clothing.category

);

}

saveMemory(memory);

}

export function recordOutfit(outfit){

const memory = loadMemory();

memory.totalOutfitsGenerated++;

memory.recentOutfits.unshift({

date:new Date().toISOString(),

outfit

});

memory.recentOutfits=

memory.recentOutfits.slice(0,20);

saveMemory(memory);

}

export function recordChat(question){

const memory = loadMemory();

memory.totalChats++;

memory.recentSearches.unshift(question);

memory.recentSearches=

memory.recentSearches.slice(0,20);

saveMemory(memory);

}

export function saveRecommendation(text){

const memory = loadMemory();

memory.lastRecommendation=text;

saveMemory(memory);

}

export function getStatistics(){

const memory=loadMemory();

return{

uploads:memory.totalUploads,

outfits:memory.totalOutfitsGenerated,

chats:memory.totalChats,

favoriteColors:[...new Set(memory.favoriteColors)],

favoriteCategories:[...new Set(memory.favoriteCategories)]

};

}
