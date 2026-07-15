// =====================================
// FashionAI Chat Assistant
// =====================================

import FashionAI from "./fashion-ai.js";

const chatInput =
document.getElementById("chatInput");

const sendButton =
document.getElementById("sendMessage");

const chatMessages =
document.getElementById("chatMessages");

if(sendButton){

sendButton.addEventListener(

"click",

sendMessage

);

}

if(chatInput){

chatInput.addEventListener(

"keypress",

event=>{

if(event.key==="Enter"){

sendMessage();

}

}

);

}

async function sendMessage(){

const message =
chatInput.value.trim();

if(message==="") return;

addMessage(

message,

"user"

);

chatInput.value="";

const thinking =
addMessage(

"🤖 Thinking...",

"ai"

);

const response =
await FashionAI.chat(message);

thinking.remove();

if(response.reply){

addMessage(

response.reply,

"ai"

);

return;

}

if(response.type==="outfit"){

const outfit =
response.data.outfit;

let text="✨ Outfit Suggestion\n\n";

if(outfit.top){

text+="👕 "+outfit.top.name+"\n";

}

if(outfit.bottom){

text+="👖 "+outfit.bottom.name+"\n";

}

if(outfit.shoes){

text+="👟 "+outfit.shoes.name+"\n";

}

text+="\n⭐ Score: "+response.data.score+"%";

addMessage(

text,

"ai"

);

return;

}

addMessage(

"I couldn't understand that yet.",

"ai"

);

}

function addMessage(text,sender){

const div =
document.createElement("div");

div.className=
sender==="user"
?
"user-message"
:
"ai-message";

div.textContent=text;

chatMessages.appendChild(div);

chatMessages.scrollTop=
chatMessages.scrollHeight;

return div;

}
