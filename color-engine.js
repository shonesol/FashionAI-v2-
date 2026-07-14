// =====================================
// FashionAI Color Engine
// Offline Hybrid AI
// =====================================

const COLOR_RULES = {

Black:["White","Gold","Grey","Beige","Blue"],

White:["Black","Blue","Brown","Gold","Green"],

Blue:["White","Black","Grey","Beige"],

Navy:["White","Cream","Gold","Grey"],

Grey:["Black","White","Blue"],

Brown:["Cream","White","Beige"],

Beige:["Brown","Black","White","Navy"],

Cream:["Brown","Gold","Navy"],

Green:["White","Beige","Brown"],

Red:["Black","White"],

Pink:["White","Grey"],

Purple:["White","Black"],

Orange:["Black","White"],

Yellow:["Black","Blue"],

Gold:["Black","White","Navy"]

};

export function colorsMatch(color1,color2){

if(!color1 || !color2) return false;

color1=color1.trim();

color2=color2.trim();

const matches=COLOR_RULES[color1];

if(!matches) return false;

return matches.includes(color2);

}

export function getMatchingColors(color){

return COLOR_RULES[color] || [];

}
