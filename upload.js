// =====================================
// FashionAI Upload
// =====================================

import FashionAI from "./fashion-ai.js";
import { saveClothing } from "./db.js";

const imageInput=document.getElementById("imageInput");
const preview=document.getElementById("imagePreview");
const analyzeBtn=document.getElementById("analyzeClothingBtn");
const saveBtn=document.getElementById("saveClothingBtn");

let currentResult=null;

imageInput.addEventListener("change",async()=>{

    const file=imageInput.files[0];

    if(!file) return;

    preview.src=URL.createObjectURL(file);

});

analyzeBtn.addEventListener("click",async()=>{

    const file=imageInput.files[0];

    if(!file){

        alert("Choose an image first.");

        return;

    }

    analyzeBtn.disabled=true;
    analyzeBtn.textContent="Analyzing...";

    const result=await FashionAI.analyze(file);

    analyzeBtn.disabled=false;
    analyzeBtn.textContent="🤖 Analyze With AI";

    if(!result.success){

        alert(result.error);

        return;

    }

    currentResult=result.analysis;

    document.getElementById("clothingName").value=currentResult.name;
    document.getElementById("category").value=currentResult.category;
    document.getElementById("color").value=currentResult.primaryColor;
    document.getElementById("season").value=currentResult.season;
    document.getElementById("occasion").value=currentResult.occasion;

    alert("✅ Analysis Complete ("+result.source+")");

});

saveBtn.addEventListener("click",async()=>{

    if(!currentResult){

        alert("Analyze the clothing first.");

        return;

    }

    const clothing={

        image:preview.src,

        name:document.getElementById("clothingName").value,

        category:document.getElementById("category").value,

        primaryColor:currentResult.primaryColor,

        secondaryColor:currentResult.secondaryColor,

        material:currentResult.material,

        pattern:currentResult.pattern,

        season:document.getElementById("season").value,

        occasion:document.getElementById("occasion").value,

        style:currentResult.style,

        favorite:false,

        timesWorn:0,

        laundryStatus:"Clean",

        dateAdded:new Date().toISOString()

    };

    await saveClothing(clothing);

    alert("✅ Clothing saved permanently.");

});
