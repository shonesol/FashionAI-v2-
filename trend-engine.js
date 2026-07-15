// =====================================
// FashionAI Trend Engine
// =====================================

const FASHION_TRENDS = [

{
season:"Summer",
colors:["White","Beige","Sky Blue","Yellow"],
style:"Light & Minimal"
},

{
season:"Winter",
colors:["Black","Brown","Grey","Navy"],
style:"Layered Fashion"
},

{
season:"Rainy",
colors:["Olive","Dark Blue","Black"],
style:"Water Resistant"
},

{
season:"All Season",
colors:["White","Black","Beige","Navy"],
style:"Classic Fashion"
}

];

export function getCurrentTrend(season="All Season"){

const trend =
FASHION_TRENDS.find(t=>t.season===season);

return trend || FASHION_TRENDS[3];

}

export function getTrendingColors(season){

return getCurrentTrend(season).colors;

}

export function getTrendingStyle(season){

return getCurrentTrend(season).style;

}

export function getFashionTip(){

const tips=[

"✨ Neutral colors never go out of style.",

"👟 Clean shoes improve every outfit.",

"🧥 Layer clothing during cold weather.",

"🎨 Match accessories with your shoes.",

"👕 Avoid wearing dirty clothes twice.",

"🌟 Confidence is your best fashion accessory.",

"👜 Keep your wardrobe organized for faster outfit selection.",

"👔 Invest in timeless wardrobe essentials."

];

return tips[
Math.floor(Math.random()*tips.length)
];

}
