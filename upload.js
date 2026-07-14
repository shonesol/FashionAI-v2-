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

analyzeBtn.onclick = async()=>{


const file =
imageInput.files[0];


if(!file){

alert(
"Please upload an image first"
);

return;

}



analyzeBtn.innerHTML =
"🤖 FashionAI is analyzing...";



const reader =
new FileReader();



reader.onload = async()=>{


const image =
reader.result;



try{


clothingData =
await analyzeClothing(
image
);



resultCard.style.display =
"block";



result.innerHTML = `

👕 Type:
${clothingData.type}

<br><br>

🎨 Color:
${clothingData.primaryColor}

<br><br>

🧵 Material:
${clothingData.material}

<br><br>

✨ Style:
${clothingData.style}

<br><br>

🎯 Occasion:
${clothingData.occasion}

`;



}


catch(error){


alert(
"AI analysis failed"
);


}



analyzeBtn.innerHTML =
"🤖 Analyze With FashionAI";


};



reader.readAsDataURL(file);


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
