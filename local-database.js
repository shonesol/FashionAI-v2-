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
