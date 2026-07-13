import {
openDatabase,
saveClothing
}
from "./local-database.js";



let imageData = null;



await openDatabase();



// Select image

const imageInput =
document.getElementById(
"clothingImage"
);



imageInput.addEventListener(
"change",
()=>{


const file =
imageInput.files[0];



const reader =
new FileReader();



reader.onload=()=>{


imageData =
reader.result;



const preview =
document.getElementById(
"preview"
);



preview.src =
imageData;



preview.style.display =
"block";


};



reader.readAsDataURL(file);


});





// AI Analysis button


document
.getElementById("analyzeBtn")
.addEventListener(
"click",
()=>{


alert(
"FashionAI analysis will connect to Gemini here."
);


// Later:
// send imageData to Gemini
// receive category/color/style


document.getElementById("category").value =
"Shirt";


document.getElementById("color").value =
"White";


document.getElementById("material").value =
"Cotton";


document.getElementById("style").value =
"Casual";


});






// Save clothing


document
.getElementById("saveBtn")
.addEventListener(
"click",
async()=>{


const clothing={


image:imageData,


category:
document.getElementById("category").value,


color:
document.getElementById("color").value,


material:
document.getElementById("material").value,


style:
document.getElementById("style").value,


favorite:false,


dateAdded:
new Date().toISOString()


};



await saveClothing(
clothing
);



alert(
"✨ Clothing saved to your FashionAI wardrobe!"
);



});
