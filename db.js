// =====================================
// FashionAI Database
// Part 1
// =====================================

const DB_NAME="FashionAI";

const DB_VERSION=2;

const STORE_NAME="wardrobe";

let db=null;

export function openDatabase(){

return new Promise((resolve,reject)=>{

if(db){

resolve(db);

return;

}

const request=indexedDB.open(

DB_NAME,

DB_VERSION

);

request.onupgradeneeded=e=>{

db=e.target.result;

if(!db.objectStoreNames.contains(STORE_NAME)){

const store=db.createObjectStore(

STORE_NAME,

{

keyPath:"id",

autoIncrement:true

}

);

store.createIndex("category","category");

store.createIndex("primaryColor","primaryColor");

store.createIndex("season","season");

store.createIndex("occasion","occasion");

store.createIndex("favorite","favorite");

}

};

request.onsuccess=e=>{

db=e.target.result;

resolve(db);

};

request.onerror=()=>{

reject(request.error);

};

});

}
// =====================================
// Save Clothing
// =====================================

export async function saveClothing(clothing){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readwrite");

const store=tx.objectStore(STORE_NAME);

const request=store.add({

image:clothing.image,

name:clothing.name,

category:clothing.category,

primaryColor:clothing.primaryColor,

secondaryColor:clothing.secondaryColor,

material:clothing.material,

pattern:clothing.pattern,

season:clothing.season,

occasion:clothing.occasion,

style:clothing.style,

favorite:clothing.favorite || false,

timesWorn:clothing.timesWorn || 0,

lastWorn:clothing.lastWorn || null,

laundryStatus:clothing.laundryStatus || "Clean",

dateAdded:clothing.dateAdded || new Date().toISOString()

});

request.onsuccess=()=>resolve(true);

request.onerror=()=>reject(request.error);

});

}



// =====================================
// Get All Clothes
// =====================================

export async function getAllClothes(){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readonly");

const store=tx.objectStore(STORE_NAME);

const request=store.getAll();

request.onsuccess=()=>{

resolve(request.result);

};

request.onerror=()=>{

reject(request.error);

};

});

}
// =====================================
// Get One Clothing Item
// =====================================

export async function getClothing(id){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readonly");

const store=tx.objectStore(STORE_NAME);

const request=store.get(id);

request.onsuccess=()=>{

resolve(request.result);

};

request.onerror=()=>{

reject(request.error);

};

});

}



// =====================================
// Update Clothing
// =====================================

export async function updateClothing(clothing){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readwrite");

const store=tx.objectStore(STORE_NAME);

const request=store.put(clothing);

request.onsuccess=()=>{

resolve(true);

};

request.onerror=()=>{

reject(request.error);

};

});

}



// =====================================
// Delete Clothing
// =====================================

export async function deleteClothing(id){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readwrite");

const store=tx.objectStore(STORE_NAME);

const request=store.delete(id);

request.onsuccess=()=>{

resolve(true);

};

request.onerror=()=>{

reject(request.error);

};

});

}
// =====================================
// Clear Wardrobe
// =====================================

export async function clearWardrobe(){

const db=await openDatabase();

return new Promise((resolve,reject)=>{

const tx=db.transaction(STORE_NAME,"readwrite");

const store=tx.objectStore(STORE_NAME);

const request=store.clear();

request.onsuccess=()=>resolve(true);

request.onerror=()=>reject(request.error);

});

}



// =====================================
// Toggle Favorite
// =====================================

export async function toggleFavorite(id){

const clothing=await getClothing(id);

if(!clothing) return false;

clothing.favorite=!clothing.favorite;

await updateClothing(clothing);

return true;

}



// =====================================
// Update Laundry Status
// =====================================

export async function updateLaundryStatus(id,status){

const clothing=await getClothing(id);

if(!clothing) return false;

clothing.laundryStatus=status;

await updateClothing(clothing);

return true;

}



// =====================================
// Increase Wear Count
// =====================================

export async function increaseWearCount(id){

const clothing=await getClothing(id);

if(!clothing) return false;

clothing.timesWorn++;

clothing.lastWorn=new Date().toISOString();

await updateClothing(clothing);

return true;

}



// =====================================
// Search Clothes
// =====================================

export async function searchClothes(text){

const clothes=await getAllClothes();

text=text.toLowerCase();

return clothes.filter(item=>

(item.name||"").toLowerCase().includes(text)||

(item.category||"").toLowerCase().includes(text)||

(item.primaryColor||"").toLowerCase().includes(text)||

(item.material||"").toLowerCase().includes(text)||

(item.style||"").toLowerCase().includes(text)

);

}
