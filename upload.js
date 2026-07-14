import {
saveClothing
}
from "./database.js";

import {
analyzeClothing
}
from "./clothing-ai.js";

const imageInput =
document.getElementById(
"imageInput"
);


const preview =
document.getElementById(
"preview"
);


const analyzeBtn =
document.getElementById(
"analyzeBtn"
);


const resultCard =
document.getElementById(
"resultCard"
);



const result =
document.getElementById(
"result"
);


const saveBtn =
document.getElementById(
"saveBtn"
);



let clothingData = {};





// Image Preview

imageInput.onchange = ()=>{


const file =
imageInput.files[0];


if(file){


const reader =
new FileReader();



reader.onload = e=>{


preview.src =
e.target.result;


preview.style.display =
"block";


};


reader.readAsDataURL(file);


}


};






// AI Analysis Placeholder

analyzeBtn.onclick = ()=>{


resultCard.style.display =
"block";



clothingData={


type:"Shirt",

color:"White",

category:"Casual",

style:"Modern"


};



result.innerHTML = `

👕 Type:
${clothingData.type}

<br><br>

🎨 Color:
${clothingData.color}

<br><br>

✨ Style:
${clothingData.style}

<br><br>

Category:
${clothingData.category}

`;


};






// Save Clothing


saveBtn.onclick = async()=>{


await saveClothing({

...clothingData,

date:
new Date().toISOString()


});



alert(
"Saved to your wardrobe ❤️"
);


};
