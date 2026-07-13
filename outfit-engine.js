// FashionAI Smart Hybrid Outfit Engine


// ==============================
// Color Compatibility
// ==============================


const colorMatches = {

white:["blue","black","beige","gold","grey"],
blue:["white","beige","black","gold"],
black:["white","red","gold","grey"],
beige:["white","brown","blue","gold"],
grey:["black","white","blue"]

};




// ==============================
// Occasion Rules
// ==============================


const occasionRules = {


office:[
"shirt",
"blouse",
"trousers",
"blazer"
],


casual:[
"t-shirt",
"shirt",
"jeans",
"sneakers"
],


party:[
"dress",
"skirt",
"heels",
"accessories"
],


travel:[
"jeans",
"shirt",
"jacket",
"sneakers"
]


};






// ==============================
// Find color matches
// ==============================


function getMatchingColors(color){


return colorMatches[
color.toLowerCase()
] || [];

}





// ==============================
// Score clothing item
// ==============================


function scoreItem(
item,
preferences,
occasion
){


let score=0;



// Favorite style

if(
preferences &&
item.style === preferences.style
){

score += 3;

}



// Favorite color

if(
preferences &&
preferences.colors.includes(
item.color
)
){

score += 2;

}



// Occasion match

if(
item.occasion &&
item.occasion.includes(
occasion
)
){

score += 3;

}



return score;

}







// ==============================
// Generate Outfit
// ==============================


export function generateOutfit(

wardrobe,

occasion="casual",

preferences={}

){



let tops =
wardrobe.filter(item=>

[
"shirt",
"top",
"blouse",
"t-shirt"
]
.includes(
item.category
)

);



let bottoms =
wardrobe.filter(item=>

[
"pants",
"trousers",
"jeans",
"skirt"
]
.includes(
item.category
)

);



let shoes =
wardrobe.filter(item=>

item.category==="shoes"

);





if(
tops.length===0 ||
bottoms.length===0
){


return {

message:
"Your wardrobe needs more items."

};


}







// Rank tops

tops.sort(
(a,b)=>

scoreItem(
b,
preferences,
occasion
)
-
scoreItem(
a,
preferences,
occasion
)

);





let chosenTop =
tops[0];





let matchingColors =
getMatchingColors(
chosenTop.color
);





let chosenBottom =

bottoms.find(item=>

matchingColors.includes(
item.color.toLowerCase()
)

)

||
bottoms[0];








let rating = Math.min(

10,

scoreItem(
chosenTop,
preferences,
occasion
)
+
scoreItem(
chosenBottom,
preferences,
occasion
)

);







return {


top:chosenTop,


bottom:chosenBottom,


shoes:shoes[0] || null,


occasion:occasion,


rating:rating,


reason:

`I selected this outfit because your ${chosenTop.color} ${chosenTop.category} matches well with your ${chosenBottom.color} ${chosenBottom.category}.`


};


}
