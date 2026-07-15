// =====================================
// FashionAI Wardrobe
// Part 1
// =====================================

import {

getAllClothes,
deleteClothing,
toggleFavorite

} from "./db.js";

const wardrobeGrid =
document.getElementById("wardrobeGrid");

let clothes = [];

export async function loadWardrobe(){

if(!wardrobeGrid) return;

clothes = await getAllClothes();

renderWardrobe(clothes);

}

function renderWardrobe(items){

wardrobeGrid.innerHTML="";

if(items.length===0){

wardrobeGrid.innerHTML=`

<div class="empty-card">

<h2>👗</h2>

<h3>Your wardrobe is empty</h3>

<p>Upload your first clothing item.</p>

</div>

`;

return;

}

items.forEach(item=>{

const card=document.createElement("div");

card.className="clothing-card";

card.innerHTML=`

<img
class="clothing-image"
src="${item.image}"
alt="${item.name}">

<div class="clothing-details">

<h3>${item.name}</h3>

<p>👕 ${item.category}</p>

<p>🎨 ${item.primaryColor}</p>

<p>🧵 ${item.material}</p>

<p>🌤 ${item.season}</p>

<p>🎉 ${item.occasion}</p>

<p>🧺 ${item.laundryStatus}</p>

<p>👟 Worn ${item.timesWorn} times</p>

<div class="card-buttons">

<button
class="favorite-btn"
data-id="${item.id}">

${item.favorite ? "❤️" : "🤍"}

</button>

<button
class="delete-btn"
data-id="${item.id}">

🗑

</button>

</div>

</div>

`;

wardrobeGrid.appendChild(card);

});

activateButtons();

}
// =====================================
// FashionAI Wardrobe
// Part 2
// =====================================

function activateButtons(){

// ==========================
// Favorite
// ==========================

document.querySelectorAll(".favorite-btn").forEach(button=>{

button.addEventListener("click",async()=>{

const id=Number(button.dataset.id);

await toggleFavorite(id);

loadWardrobe();

});

});


// ==========================
// Delete
// ==========================

document.querySelectorAll(".delete-btn").forEach(button=>{

button.addEventListener("click",async()=>{

const id=Number(button.dataset.id);

const confirmDelete=confirm(

"Delete this clothing item?"

);

if(!confirmDelete) return;

await deleteClothing(id);

loadWardrobe();

});

});

}



// ==========================
// Search
// ==========================

const searchInput=document.getElementById(
"wardrobeSearch"
);

if(searchInput){

searchInput.addEventListener("input",()=>{

const text=searchInput.value.toLowerCase();

const filtered=clothes.filter(item=>{

return(

(item.name||"")
.toLowerCase()
.includes(text)

||

(item.category||"")
.toLowerCase()
.includes(text)

||

(item.primaryColor||"")
.toLowerCase()
.includes(text)

||

(item.material||"")
.toLowerCase()
.includes(text)

);

});

renderWardrobe(filtered);

});

}



// ==========================
// Category Filter
// ==========================

const categoryFilter=document.getElementById(
"categoryFilter"
);

if(categoryFilter){

categoryFilter.addEventListener("change",()=>{

const value=categoryFilter.value;

if(value===""){

renderWardrobe(clothes);

return;

}

const filtered=clothes.filter(item=>

item.category===value

);

renderWardrobe(filtered);

});

}
