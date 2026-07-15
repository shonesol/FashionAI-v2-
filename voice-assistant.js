// =====================================
// FashionAI Voice Assistant
// =====================================

import FashionAI from "./fashion-ai.js";

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

let recognition = null;

if(SpeechRecognition){

recognition = new SpeechRecognition();

recognition.lang = "en-US";

recognition.continuous = false;

recognition.interimResults = false;

}

export function startListening(){

if(!recognition){

alert("Voice recognition is not supported on this device.");

return;

}

recognition.start();

}

if(recognition){

recognition.onresult = async(event)=>{

const message =

event.results[0][0].transcript;

const input =
document.getElementById("chatInput");

if(input){

input.value = message;

}

const response =
await FashionAI.chat(message);

let reply =
response.reply || "";

if(response.type==="outfit"){

reply = "I have generated an outfit for you.";

}

speak(reply);

const messages =
document.getElementById("chatMessages");

if(messages){

const user=document.createElement("div");

user.className="user-message";

user.textContent=message;

messages.appendChild(user);

const ai=document.createElement("div");

ai.className="ai-message";

ai.textContent=reply;

messages.appendChild(ai);

messages.scrollTop=messages.scrollHeight;

}

};

}

export function speak(text){

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "en-US";

speech.rate = 1;

speech.pitch = 1;

speech.volume = 1;

window.speechSynthesis.speak(speech);

}
