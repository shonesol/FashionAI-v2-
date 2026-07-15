// =====================================
// FashionAI Style Engine
// Offline Hybrid AI
// =====================================

export const STYLE_RULES = {

Office:{
tops:["Shirt","Blouse"],
bottoms:["Pants","Skirt"],
shoes:["Shoes"],
colors:["Black","White","Navy","Grey","Brown"]
},

Casual:{
tops:["T-Shirt","Shirt"],
bottoms:["Jeans","Shorts","Skirt"],
shoes:["Sneakers","Shoes"]
},

Party:{
tops:["Dress","Shirt"],
bottoms:["Skirt","Pants"],
shoes:["Heels","Shoes"]
},

Wedding:{
tops:["Dress","Blouse","Shirt"],
bottoms:["Skirt","Pants"],
shoes:["Heels","Shoes"],
colors:["Gold","Black","White","Navy"]
},

Travel:{
tops:["T-Shirt","Shirt"],
bottoms:["Jeans","Shorts"],
shoes:["Sneakers","Shoes"]
}

};

export function getStyleRule(occasion){

return STYLE_RULES[occasion] || STYLE_RULES.Casual;

}
