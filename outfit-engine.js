// FashionAI Rule-Based Outfit Engine


// Color matching rules

const colorMatches = {


white:[
"blue",
"black",
"beige",
"gold",
"grey"
],


blue:[
"white",
"beige",
"black",
"gold"
],


black:[
"white",
"red",
"gold",
"grey"
],


beige:[
"white",
"brown",
"blue",
"gold"
],


grey:[
"black",
"white",
"blue"
]


};





// Find matching colors

function matchColor(color){


color =
color.toLowerCase();



return colorMatches[color] || [];

}






// Generate outfit

export function generateOutfit(
wardrobe,
occasion="casual"
){



let tops =
wardrobe.filter(item=>

item.category === "shirt" ||
item.category === "top" ||
item.category === "blouse"

);



let bottoms =
wardrobe.filter(item=>

item.category === "pants" ||
item.category === "trousers" ||
item.category === "skirt"

);



let shoes =
wardrobe.filter(item=>

item.category === "shoes"

);






if(
tops.length===0 ||
bottoms.length===0
){

return {

message:
"Add more clothing items to create outfits."

};

}







let selectedTop =
tops[0];


let possibleColors =
matchColor(
selectedTop.color
);



let selectedBottom =
bottoms.find(item=>

possibleColors.includes(
item.color.toLowerCase()
)

)

||
bottoms[0];





return {


top:selectedTop,


bottom:selectedBottom,


shoes:
shoes[0] || null,


occasion:occasion,


message:
"✨ FashionAI created an outfit using your wardrobe."


};


}
