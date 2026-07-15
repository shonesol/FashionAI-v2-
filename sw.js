// =====================================
// FashionAI Service Worker
// sw.js
// =====================================

const CACHE_NAME = "fashionai-v1";

const FILES_TO_CACHE = [

"/",

"/index.html",

"/style.css",

"/app.js",

"/db.js",

"/upload.js",

"/wardrobe.js",

"/fashion-ai.js",

"/voice-assistant.js",

"/manifest.json"

];

// ==============================
// Install
// ==============================

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(FILES_TO_CACHE);

})

);

self.skipWaiting();

});


// ==============================
// Activate
// ==============================

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

});


// ==============================
// Fetch
// ==============================

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

if(response){

return response;

}

return fetch(event.request)

.then(networkResponse=>{

if(event.request.method==="GET"){

const clone=networkResponse.clone();

caches.open(CACHE_NAME)

.then(cache=>{

cache.put(event.request,clone);

});

}

return networkResponse;

})

.catch(()=>{

return caches.match("/index.html");

});

})

);

});
