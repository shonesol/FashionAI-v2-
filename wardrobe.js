import {

loadWardrobe,
searchWardrobe,
filterWardrobe,
toggleFavorite,
removeClothing,
getWardrobe

}

from "./wardrobe-manager.js";


import {

generateOutfit

}

from "./outfit-engine.js";





await loadWardrobe();



const grid =
document.getElementById(
"wardrobeGrid"
);





function displayClothes(items){


grid.innerHTML="";



items.forEach(item=>{


const card =
document.createElement(
"div"
);



card.className =
"stat-card";



card.innerHTML = `


<img src="${item.image}"
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


<button class="favorite">

${item.favorite ? "❤️":"🤍"}

</button>


<button class="delete">

🗑 Delete

</button>


`;





card.querySelector(".favorite")
.onclick=()=>{


toggleFavorite(item.id);

displayClothes(
getWardrobe()
);


};





card.querySelector(".delete")
.onclick=async()=>{


if(confirm(
"Delete this clothing item?"
)){


await removeClothing(
item.id
);


displayClothes(
getWardrobe()
);


}


};



grid.appendChild(card);


});


}




displayClothes(
getWardrobe()
);







// Search

document
.getElementById(
"searchBox"
)
.addEventListener(
"input",
(e)=>{


displayClothes(

searchWardrobe(
e.target.value
)

);


});







// Filters

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




function applyFilters(){


displayClothes(

filterWardrobe({

category:
document.getElementById(
"categoryFilter"
).value,


color:
document.getElementById(
"colorFilter"
).value


})

);


}
