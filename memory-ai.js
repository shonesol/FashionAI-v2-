// =====================================
// FashionAI Memory AI
// =====================================

const KEY = "fashionai_memory";

function loadMemory(){

    const data = localStorage.getItem(KEY);

    if(data){

        return JSON.parse(data);

    }

    return{

        favoriteColor:null,

        favoriteOccasion:null,

        wearHistory:[],

        favoriteItems:[],

        totalOutfits:0

    };

}

function saveMemory(memory){

    localStorage.setItem(

        KEY,

        JSON.stringify(memory)

    );

}

export function rememberOutfit(outfit){

    const memory = loadMemory();

    memory.totalOutfits++;

    memory.wearHistory.push({

        date:new Date().toISOString(),

        outfit

    });

    saveMemory(memory);

}

export function rememberFavorite(id){

    const memory = loadMemory();

    if(!memory.favoriteItems.includes(id)){

        memory.favoriteItems.push(id);

    }

    saveMemory(memory);

}

export function setFavoriteColor(color){

    const memory = loadMemory();

    memory.favoriteColor = color;

    saveMemory(memory);

}

export function setFavoriteOccasion(occasion){

    const memory = loadMemory();

    memory.favoriteOccasion = occasion;

    saveMemory(memory);

}

export function getMemory(){

    return loadMemory();

}
