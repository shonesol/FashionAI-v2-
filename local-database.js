// FashionAI Local Database
// Stores wardrobe and outfit history privately on the user's phone


const DATABASE_NAME = "FashionAI_DB";

const DATABASE_VERSION = 2;


const WARDROBE_STORE = "wardrobe";

const OUTFIT_STORE = "outfitHistory";


let db;





// ===============================
// Open Database
// ===============================


export function openDatabase(){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
DATABASE_NAME,
DATABASE_VERSION
);





request.onupgradeneeded = (event)=>{


db =
event.target.result;





// Wardrobe Store

if(
!db.objectStoreNames.contains(
WARDROBE_STORE
)
){


const wardrobeStore =
db.createObjectStore(
WARDROBE_STORE,
{

keyPath:"id",

autoIncrement:true

}

);



wardrobeStore.createIndex(
"category",
"category",
{
unique:false
}
);



wardrobeStore.createIndex(
"color",
"color",
{
unique:false
}
);



wardrobeStore.createIndex(
"favorite",
"favorite",
{
unique:false
}
);



}







// Outfit History Store


if(
!db.objectStoreNames.contains(
OUTFIT_STORE
)
){


const outfitStore =
db.createObjectStore(
OUTFIT_STORE,
{

keyPath:"id",

autoIncrement:true

}

);



outfitStore.createIndex(
"date",
"date",
{
unique:false
}
);



}



};







request.onsuccess=(event)=>{


db =
event.target.result;


resolve(db);


};






request.onerror=(error)=>{


reject(error);


};



});


}









// ===============================
// Save Clothing
// ===============================


export function saveClothing(item){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
WARDROBE_STORE,
"readwrite"
);



const store =
transaction.objectStore(
WARDROBE_STORE
);



const request =
store.add(item);



request.onsuccess=()=>{


resolve(true);


};



request.onerror=()=>{


reject(false);


};



});


}









// ===============================
// Get All Clothes
// ===============================


export function getAllClothes(){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
WARDROBE_STORE,
"readonly"
);



const store =
transaction.objectStore(
WARDROBE_STORE
);



const request =
store.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>{


reject(false);


};



});


}









// ===============================
// Update Clothing
// ===============================


export function updateClothing(
id,
changes
){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
WARDROBE_STORE,
"readwrite"
);



const store =
transaction.objectStore(
WARDROBE_STORE
);



const request =
store.get(id);



request.onsuccess=()=>{


const item =
request.result;



if(item){


const updated = {


...item,


...changes


};



store.put(updated);



resolve(updated);


}

else{


reject(
"Item not found"
);


}



};





request.onerror=()=>{


reject(
"Update failed"
);


};



});


}









// ===============================
// Delete Clothing
// ===============================


export function deleteClothing(id){


return new Promise((resolve)=>{


const transaction =
db.transaction(
WARDROBE_STORE,
"readwrite"
);



const store =
transaction.objectStore(
WARDROBE_STORE
);



store.delete(id);



resolve(true);



});


}









// ===============================
// Save Outfit History
// ===============================


export function saveOutfit(outfit){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
OUTFIT_STORE,
"readwrite"
);



const store =
transaction.objectStore(
OUTFIT_STORE
);




const data = {


...outfit,


date:
new Date()
.toISOString(),


favorite:false


};





const request =
store.add(data);




request.onsuccess=()=>{


resolve(true);


};




request.onerror=()=>{


reject(false);


};



});


}









// ===============================
// Get Outfit History
// ===============================


export function getOutfitHistory(){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
OUTFIT_STORE,
"readonly"
);



const store =
transaction.objectStore(
OUTFIT_STORE
);



const request =
store.getAll();




request.onsuccess=()=>{


resolve(
request.result
);


};




request.onerror=()=>{


reject(false);


};



});


}









// ===============================
// Rate Outfit
// ===============================


export function rateOutfit(
id,
rating
){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
OUTFIT_STORE,
"readwrite"
);



const store =
transaction.objectStore(
OUTFIT_STORE
);



const request =
store.get(id);




request.onsuccess=()=>{


const outfit =
request.result;



if(outfit){


outfit.rating =
rating;



store.put(outfit);



resolve(outfit);


}

else{


reject(
"Outfit not found"
);


}



};



});


}
