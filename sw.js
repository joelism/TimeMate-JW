const CACHE_NAME='tmjw-root-v1';
const ASSETS=['/','/index.html','/style.css','/app.js','/manifest.webmanifest','/tmassets/icon-180x180.png','/tmassets/icon-192.png','/tmassets/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{const copy=net.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));return net})).catch(()=>caches.match('/index.html')))});