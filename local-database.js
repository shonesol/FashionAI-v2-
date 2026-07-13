// ===============================
// Toggle Favorite Outfit
// ===============================

export function toggleFavoriteOutfit(id){


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


outfit.favorite =
!outfit.favorite;



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







// ===============================
// Get Favorite Outfits
// ===============================


export function getFavoriteOutfits(){


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


const favorites =
request.result.filter(
outfit=>outfit.favorite === true
);



resolve(
favorites
);


};



request.onerror=()=>{


reject(false);


};



});


}){


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
