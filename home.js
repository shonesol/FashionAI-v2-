// ===================================
// FashionAI Premium Home Controller
// ===================================


// Greeting

const greeting =
document.getElementById("greeting");


const hour =
new Date().getHours();


if(hour < 12){

greeting.textContent =
"Good Morning ☀️";

}

else if(hour < 18){

greeting.textContent =
"Good Afternoon 🌤";

}

else{

greeting.textContent =
"Good Evening 🌙";

}





// Daily Fashion Quotes

const quotes = [

"Style is confidence you can wear.",

"Fashion tells your story before you speak.",

"Elegance begins with a beautiful choice.",

"Your wardrobe is your creative space.",

"Great style starts with confidence."

];


const today =
new Date().getDate();


const quote =
document.getElementById("quote");


quote.textContent =
`"${quotes[today % quotes.length]}"`;







// Quick Actions Navigation


document
.querySelectorAll(".action")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


const page =
button.dataset.page;


if(page){

window.location.href =
page;

}


});


});







// Bottom Navigation Animation


document
.querySelectorAll(".bottom-nav button")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


document
.querySelectorAll(".bottom-nav button")
.forEach(item=>{

item.classList.remove("active");

});


btn.classList.add("active");


});


});







// Simple outfit rating animation

const stars =
document.querySelector(".stars");


if(stars){


stars.style.opacity="0";


setTimeout(()=>{

stars.style.transition=".8s";

stars.style.opacity="1";


},1200);


}





// Future Google User Display

const user =
localStorage.getItem("fashionUser");


if(user){


console.log(
"FashionAI user:",
user
);


}




// Service Worker

if("serviceWorker" in navigator){


window.addEventListener(
"load",
()=>{


navigator.serviceWorker
.register("sw.js")
.then(()=>{

console.log(
"FashionAI offline mode ready"
);


});


});


}



console.log(
"✨ FashionAI Home Loaded"
);
