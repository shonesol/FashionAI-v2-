// FashionAI Wardrobe Controller


import {

loadWardrobe,
getWardrobe,
searchWardrobe,
filterWardrobe,
toggleFavorite,
editClothing,
removeClothing,
getWardrobeStats

}

from "./wardrobe-manager.js";



import {

generateOutfit

}

from "./outfit-engine.js";





// Load wardrobe

await loadWardrobe();






const grid =
document.getElementById(
"wardrobeGrid"
);







// Display clothes

function displayClothes(items){



grid.innerHTML="";





if(items.length===0){


grid.innerHTML = `

<div class="card">

<h3>
Your wardrobe is empty 👗
</h3>

<p>
Upload clothes to start building your smart closet.
</p>

</div>

`;


return;

}







items.forEach(item=>{


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
height:150px;
object-fit:cover;
border-radius:20px;
"

>



<h3>
${item.category || "Clothing"}
</h3>


<p>
🎨 ${item.color || ""}
</p>


<p>
✨ ${item.style || ""}
</p>



<button class="favoriteBtn">

${item.favorite ? "❤️":"🤍"}

</button>



<button class="editBtn">

✏️ Edit

</button>



<button class="deleteBtn">

🗑 Delete

</button>


`;







// Favorite


card
.querySelector(".favoriteBtn")
.onclick=async()=>{


await toggleFavorite(
item.id
);



displayClothes(
getWardrobe()
);



};







// Edit


card
.querySelector(".editBtn")
.onclick=async()=>{



const newColor =
prompt(
"Change color:",
item.color
);



const newStyle =
prompt(
"Change style:",
item.style
);





await editClothing(

item.id,

{

color:newColor,

style:newStyle

}

);




displayClothes(
getWardrobe()
);



};









// Delete


card
.querySelector(".deleteBtn")
.onclick=async()=>{



const confirmDelete =
confirm(

"Delete this clothing item permanently?"

);



if(confirmDelete){



await removeClothing(
item.id
);



displayClothes(
getWardrobe()
);



updateStats();



}



};







grid.appendChild(card);



});



}









// Initial display


displayClothes(
getWardrobe()
);









// SEARCH


document
.getElementById(
"searchBox"
)
.addEventListener(
"input",
(event)=>{


const results =
searchWardrobe(
event.target.value
);



displayClothes(
results
);



});









// FILTERS


function applyFilters(){


const category =
document
.getElementById(
"categoryFilter"
)
.value;



const color =
document
.getElementById(
"colorFilter"
)
.value;





const results =
filterWardrobe({

category:category,

color:color

});





displayClothes(
results
);



}






document
.getElementById(
"categoryFilter"
)
.addEventListener(
"change",
applyFilters
);



document
.getElementById(
"colorFilter"
)
.addEventListener(
"change",
applyFilters
);










// Statistics


function updateStats(){



const stats =
getWardrobeStats();




document
.getElementById(
"stats"
)
.innerHTML = `


<p>
👗 Total Items:
${stats.total}
</p>


<p>
❤️ Favorites:
${stats.favorites}
</p>


<p>
🎨 Colors:
${Object.keys(stats.colors).join(", ") || "None"}
</p>


<p>
👚 Categories:
${Object.keys(stats.categories).join(", ") || "None"}
</p>


`;



}



updateStats();









// Outfit Generator


document
.getElementById(
"generateBtn"
)
.onclick=()=>{



const occasion =
document
.getElementById(
"occasion"
)
.value;





const outfit =
generateOutfit(

getWardrobe(),

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
✨ FashionAI Look
</h3>


<p>

${outfit.reason || outfit.message}

</p>


<p>

Rating:
${outfit.rating || "N/A"}/10

</p>


`;



};
}
