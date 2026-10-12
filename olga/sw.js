'use strict';
const PREFIX='irritability-diary:'+self.registration.scope+':';
const CACHE=PREFIX+'v1.0.0';
const FILES=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png'];
const urls=FILES.map(path=>new URL(path,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(urls))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
  if(event.data?.type==='CACHE_STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE);const ready=(await Promise.all(urls.map(url=>cache.match(url)))).every(Boolean);event.ports[0]?.postMessage({ready});})());
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),3500);
      try{const response=await fetch(request,{signal:controller.signal});if(response.ok){const index=urls[0];const target=new URL(request.url);if(target.pathname===new URL(index).pathname||target.pathname===new URL(self.registration.scope).pathname){await cache.put(index,response.clone());}return response;}return await cache.match(urls[0])||response;}
      catch(error){return await cache.match(urls[0])||new Response('Дневник ещё не загружен для офлайн. Откройте его с интернетом.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});}
      finally{clearTimeout(timeout);}
    })());
  }else if(urls.includes(url.href))event.respondWith(caches.open(CACHE).then(async cache=>await cache.match(request)||fetch(request)));
});
