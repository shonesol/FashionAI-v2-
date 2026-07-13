// FashionAI Wardrobe Manager
// Controls local wardrobe data


import {

getAllClothes,
deleteClothing

}

from "./local-database.js";





let wardrobe = [];




// Load wardrobe

export async function loadWardrobe(){


wardrobe =
await getAllClothes();


return wardrobe;


}





// Get everything

export function getWardrobe(){


return wardrobe;


}






// Search clothes

export function searchWardrobe(
keyword
){


keyword =
keyword.toLowerCase();



return wardrobe.filter(item=>{


return (

item.category?.toLowerCase()
.includes(keyword)

||

item.color?.toLowerCase()
.includes(keyword)

||

item.style?.toLowerCase()
.includes(keyword)

||

item.material?.toLowerCase()
.includes(keyword)

);


});


}






// Filter clothes

export function filterWardrobe(
filters
){


return wardrobe.filter(item=>{


let result=true;



if(filters.category){


result =
result &&
item.category === filters.category;


}



if(filters.color){


result =
result &&
item.color === filters.color;


}



if(filters.style){


result =
result &&
item.style === filters.style;


}



return result;


});


}






// Toggle favorite

export function toggleFavorite(id){


const item =
wardrobe.find(
clothing=>clothing.id===id
);



if(item){


item.favorite =
!item.favorite;


}



return item;


}






// Get favorites

export function getFavorites(){


return wardrobe.filter(
item=>item.favorite
);


}






// Delete item

export async function removeClothing(id){


await deleteClothing(id);



wardrobe =
wardrobe.filter(
item=>item.id!==id
);



return true;


}
