// =====================================
// FashionAI Weather Engine
// =====================================

const WEATHER_RULES={

Sunny:{

tops:["T-Shirt","Shirt"],

bottoms:["Shorts","Skirt","Jeans"],

shoes:["Sneakers","Shoes"]

},

Cloudy:{

tops:["Shirt","Jacket"],

bottoms:["Jeans","Pants"],

shoes:["Shoes"]

},

Rainy:{

tops:["Jacket","Shirt"],

bottoms:["Jeans","Pants"],

shoes:["Boots","Shoes"]

},

Cold:{

tops:["Jacket","Sweater"],

bottoms:["Jeans","Pants"],

shoes:["Boots","Shoes"]

}

};

export function getWeatherRule(weather){

return WEATHER_RULES[weather] ||

WEATHER_RULES.Sunny;

}

export function suggestWeather(weather){

switch(weather){

case "Sunny":

return "☀️ Light clothes are recommended.";

case "Cloudy":

return "☁️ A light jacket is a good idea.";

case "Rainy":

return "🌧 Carry a waterproof jacket or umbrella.";

case "Cold":

return "❄ Wear warm clothing and closed shoes.";

default:

return "Enjoy your day!";

}

}
