
const BASE='/TimeMate-JW/';
const CACHE_NAME='tmjw-shell-v2-subpath';
const ASSETS=[
  BASE, BASE+'index.html', BASE+'style.css', BASE+'app.js',
  BASE+'manifest.webmanifest',
  BASE+'tmassets/icon-180x180.png', BASE+'tmassets/icon-192.png', BASE+'tmassets/icon-512.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url = new URL(e.request.url);
  if(url.origin!==location.origin || !url.pathname.startsWith(BASE)) return;
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(net=>{
      const copy = net.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request, copy)).catch(()=>{});
      return net;
    })).catch(()=> caches.match(BASE+'index.html'))
  );
});
