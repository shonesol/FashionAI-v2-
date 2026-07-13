// FashionAI Edit Clothing Controller


import {

openDatabase,
getAllClothes,
updateClothing

}

from "./local-database.js";





// Open local phone database

await openDatabase();






// Get selected clothing ID

const clothingID =
Number(
localStorage.getItem(
"editClothingID"
)
);





// Get clothes

const clothes =
await getAllClothes();





const item =
clothes.find(
clothing =>
clothing.id === clothingID
);








// If item exists, load details

if(item){



document
.getElementById(
"editImage"
)
.src =
item.image;




document
.getElementById(
"editCategory"
)
.value =
item.category || "";



document
.getElementById(
"editColor"
)
.value =
item.color || "";



document
.getElementById(
"editMaterial"
)
.value =
item.material || "";



document
.getElementById(
"editStyle"
)
.value =
item.style || "";


}

else{


alert(
"Clothing item not found"
);


window.location.href =
"wardrobe.html";


}









// Save changes

document
.getElementById(
"saveEdit"
)
.onclick = async ()=>{



const updatedItem = {


category:

document
.getElementById(
"editCategory"
)
.value,



color:

document
.getElementById(
"editColor"
)
.value,



material:

document
.getElementById(
"editMaterial"
)
.value,



style:

document
.getElementById(
"editStyle"
)
.value



};







await updateClothing(

clothingID,

updatedItem

);






alert(
"✨ Clothing updated successfully!"
);





// Return to wardrobe

window.location.href =
"wardrobe.html";


};
