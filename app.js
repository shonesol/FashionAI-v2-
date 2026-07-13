// FashionAI Home Controller


// ================================
// Dynamic Greeting
// ================================

function updateGreeting(){

    const greeting =
    document.getElementById("greeting");


    const hour =
    new Date().getHours();


    let message;


    if(hour < 12){

        message = "Good Morning, Brenda 🌞";

    }

    else if(hour < 18){

        message = "Good Afternoon, Brenda ☀️";

    }

    else{

        message = "Good Evening, Brenda 🌙";

    }


    greeting.textContent = message;

}



updateGreeting();




// ================================
// Quick Actions
// ================================


const buttons =
document.querySelectorAll("button");


buttons.forEach(button=>{


button.addEventListener("click",()=>{


console.log(
"FashionAI action:",
button.textContent
);


// Later these will connect to:
// Upload page
// Wardrobe page
// Outfit generator
// AI Assistant


});


});




// ================================
// Demo User Data
// (Later replaced with Firebase)
// ================================


const userProfile = {


name:"Brenda",


wardrobeCount:128,


favoriteColor:[
"Blue",
"Beige",
"Gold"
],


style:
"Elegant Casual"


};



console.log(
"FashionAI User:",
userProfile
);





// ================================
// Future AI Connection
// ================================


async function loadFashionAI(){


console.log(
"FashionAI AI system ready..."
);


// Later:

// 1. Get wardrobe from Firebase
// 2. Send information to Gemini
// 3. Receive outfit suggestion
// 4. Display recommendation


}



loadFashionAI();
