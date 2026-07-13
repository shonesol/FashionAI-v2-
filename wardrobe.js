import {

openDatabase,
getAllClothes

}
from "./local-database.js";


import {

generateOutfit

}
from "./outfit-engine.js";





await openDatabase();




const clothes =
await getAllClothes();





const grid =
document.getElementById(
"wardrobeGrid"
);





// Display wardrobe


clothes.forEach(item=>{


const card =
document.createElement(
"div"
);



card.className =
"stat-card";



card.innerHTML = `

<img 
src="${item.image}"
style="
width:100%;
border-radius:20px;
">


<h3>
${item.category}
</h3>

<p>
${item.color}
</p>

<p>
${item.style}
</p>

`;



grid.appendChild(card);



});








// Generate outfit button


document
.getElementById(
"generateBtn"
)
.addEventListener(
"click",
()=>{


const occasion =
document.getElementById(
"occasion"
).value;





const outfit =
generateOutfit(
clothes,
occasion,
{

style:"Elegant",

colors:[
"blue",
"beige",
"gold"
]

}

);





document
.getElementById(
"outfitResult"
)
.innerHTML = `


<h3>
Today's Look ✨
</h3>


<p>
${outfit.reason || outfit.message}
</p>


<p>
Rating:
${outfit.rating || ""}
 /10
</p>


`;



});
