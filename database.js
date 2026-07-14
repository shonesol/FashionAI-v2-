// =================================
// FashionAI IndexedDB Storage
// =================================


const DATABASE_NAME = "FashionAI_DB";

const DATABASE_VERSION = 1;


let db;



export function openDatabase(){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
DATABASE_NAME,
DATABASE_VERSION
);



request.onupgradeneeded = (event)=>{


db = event.target.result;



if(!db.objectStoreNames.contains("wardrobe")){


db.createObjectStore(
"wardrobe",
{
keyPath:"id",
autoIncrement:true
}
);


}



if(!db.objectStoreNames.contains("favorites")){


db.createObjectStore(
"favorites",
{
keyPath:"id",
autoIncrement:true
}
);


}



};




request.onsuccess = ()=>{


db=request.result;

resolve(db);


};



request.onerror = ()=>{


reject(
"Database error"
);


};


});


}




// Add clothing item

export function saveClothing(item){


return openDatabase()
.then(()=>{


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



store.add(item);



transaction.oncomplete=()=>{


resolve(true);


};



transaction.onerror=()=>{


reject(false);


};


});


});


}




// Get wardrobe

export function getWardrobe(){


return openDatabase()
.then(()=>{


return new Promise((resolve)=>{


const transaction =
db.transaction(
"wardrobe",
"readonly"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



});


});


}
