// FashionAI Local Database
// Stores wardrobe privately on user's device


const DATABASE_NAME = "FashionAI_DB";

const DATABASE_VERSION = 1;

const STORE_NAME = "wardrobe";


let db;




// Open Database

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



if(!db.objectStoreNames.contains(STORE_NAME)){


const store =
db.createObjectStore(
STORE_NAME,
{
keyPath:"id",
autoIncrement:true
}
);



store.createIndex(
"category",
"category",
{
unique:false
}
);


store.createIndex(
"color",
"color",
{
unique:false
}
);


store.createIndex(
"favorite",
"favorite",
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







// Save clothing


export function saveClothing(item){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
STORE_NAME,
"readwrite"
);


const store =
transaction.objectStore(
STORE_NAME
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







// Get all clothes


export function getAllClothes(){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
STORE_NAME,
"readonly"
);


const store =
transaction.objectStore(
STORE_NAME
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








// Update clothing


export function updateClothing(
id,
changes
){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
STORE_NAME,
"readwrite"
);


const store =
transaction.objectStore(
STORE_NAME
);



const request =
store.get(id);



request.onsuccess=()=>{


const oldItem =
request.result;



if(oldItem){


const updated={

...oldItem,

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







// Delete clothing


export function deleteClothing(id){


return new Promise((resolve)=>{


const transaction =
db.transaction(
STORE_NAME,
"readwrite"
);


const store =
transaction.objectStore(
STORE_NAME
);



store.delete(id);



resolve(true);


});


}
