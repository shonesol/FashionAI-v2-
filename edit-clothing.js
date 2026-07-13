import {

openDatabase,
getAllClothes,
updateClothing

}

from "./local-database.js";



await openDatabase();



const id =
Number(
localStorage.getItem(
"editClothingID"
)
);




const clothes =
await getAllClothes();



const item =
clothes.find(
clothing=>clothing.id===id
);





if(item){


document.getElementById(
"editImage"
).src =
item.image;


document.getElementById(
"editCategory"
).value =
item.category;


document.getElementById(
"editColor"
).value =
item.color;


document.getElementById(
"editMaterial"
).value =
item.material;


document.getElementById(
"editStyle"
).value =
item.style;


}







document
.getElementById(
"saveEdit"
)
.onclick=async()=>{


await updateClothing(

id,

{

category:
document.getElementById(
"editCategory"
).value,


color:
document.getElementById(
"editColor"
).value,


material:
document.getElementById(
"editMaterial"
).value,


style:
document.getElementById(
"editStyle"
).value


}

);



alert(
"✨ Clothing updated!"
);



window.location.href =
"wardrobe.html";


};
