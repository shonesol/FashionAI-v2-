// FashionAI Outfit History Controller



import {

openDatabase,
getOutfitHistory

}

from "./local-database.js";





await openDatabase();





const grid =
document.getElementById(
"historyGrid"
);







const outfits =
await getOutfitHistory();







if(outfits.length === 0){


grid.innerHTML = `


<div class="card">


<h3>
No outfits yet ✨
</h3>


<p>
Generate your first FashionAI outfit.
</p>


</div>


`;



}

else{





outfits
.reverse()
.forEach(outfit=>{



const card =
document.createElement(
"div"
);



card.className =
"stat-card";





const date =
new Date(
outfit.date
)
.toLocaleDateString();






card.innerHTML = `


<h3>

✨ FashionAI Look

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

${outfit.shoes?.color || "None"}

</p>





<p>

🎉 Occasion:

${outfit.occasion}

</p>




<p>

⭐ Rating:

${outfit.rating || "Not rated"}

</p>





<p>

📅 ${date}

</p>





<p>

💡 ${outfit.reason || ""}

</p>


`;




grid.appendChild(card);



});



}
