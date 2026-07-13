// FashionAI Wardrobe Controller


import {

loadWardrobe,
getWardrobe,
searchWardrobe,
filterWardrobe,
toggleFavorite,
removeClothing,
getWardrobeStats

}

from "./wardrobe-manager.js";



import {

generateOutfit

}

from "./outfit-engine.js";



import {

saveOutfit

}

from "./local-database.js";





// Load wardrobe

await loadWardrobe();





const grid =
document.getElementById(
"wardrobeGrid"
);





// ==========================
// Display Clothes
// ==========================


function displayClothes(items){


grid.innerHTML = "";



if(items.length === 0){


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
document.createElement("div");



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
🎨 ${item.color || "Unknown"}
</p>


<p>
✨ ${item.style || "Unknown"}
</p>



<button class="favoriteBtn">

${item.favorite ? "❤️" : "🤍"}

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
.onclick = async()=>{


await toggleFavorite(
item.id
);



displayClothes(
getWardrobe()
);



updateStats();


};







// Edit

card
.querySelector(".editBtn")
.onclick = ()=>{


localStorage.setItem(
"editClothingID",
item.id
);



window.location.href =
"edit-clothing.html";


};







// Delete

card
.querySelector(".deleteBtn")
.onclick = async()=>{


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









// ==========================
// Search
// ==========================


document
.getElementById("searchBox")
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









// ==========================
// Filters
// ==========================


function applyFilters(){


const category =
document
.getElementById("categoryFilter")
.value;



const color =
document
.getElementById("colorFilter")
.value;





const results =
filterWardrobe({

category,

color

});





displayClothes(
results
);



}





document
.getElementById("categoryFilter")
.addEventListener(
"change",
applyFilters
);



document
.getElementById("colorFilter")
.addEventListener(
"change",
applyFilters
);









// ==========================
// Statistics
// ==========================


function updateStats(){


const stats =
getWardrobeStats();




document
.getElementById("stats")
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









// ==========================
// Outfit Generator + History
// ==========================


document
.getElementById("generateBtn")
.onclick = async()=>{



const occasion =
document
.getElementById("occasion")
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







if(outfit.message){


document
.getElementById("outfitResult")
.innerHTML = `


<h3>
✨ FashionAI
</h3>


<p>
${outfit.message}
</p>


`;

return;


}








// Save generated outfit


await saveOutfit({

top: outfit.top,

bottom: outfit.bottom,

shoes: outfit.shoes,

occasion: outfit.occasion,

rating: outfit.rating,

reason: outfit.reason

});








// Show outfit


document
.getElementById("outfitResult")
.innerHTML = `


<h3>
✨ Today's FashionAI Look
</h3>



<p>
👕 Top:
${outfit.top?.color || ""}
${outfit.top?.category || ""}
</p>



<p>
👖 Bottom:
${outfit.bottom?.color || ""}
${outfit.bottom?.category || ""}
</p>



<p>
👟 Shoes:
${outfit.shoes?.color || "Optional"}
</p>



<p>
💡 ${outfit.reason || ""}
</p>



<p>
⭐ Rating:
${outfit.rating || "N/A"}/10
</p>


`;



};
