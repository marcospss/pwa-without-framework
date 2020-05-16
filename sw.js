const VERSION = 'v-01';
const CACHE_STATIC_NAME = `static-${VERSION}`;
const CACHE_DYNAMIC_NAME = `dynamic-${VERSION}`;
const CACHE_SIZE = 1000;
const OFFLINE_URL = '/offline.html';
const assets = [
  '/',
  '/index.html',
  '/offline.html',
  '/js/app.js',
  '/js/bannerInstall.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook?hl=pt-br
// https://developer.mozilla.org/pt-BR/docs/Web/API/Service_Worker_API/Using_Service_Workers
// install event
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_STATIC_NAME);
    await cache.addAll(assets);
  })());
});

// activate event
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
    const keysCache = await caches.keys();
    return Promise.all(keysCache
      .filter(key => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
      .map(key => caches.delete(key))
    );
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

// fetch events
self.addEventListener('fetch', async (event) => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
          cache.put(event.request.url, fetchRes.clone())
          // check cached items size
          limitCacheSize(CACHE_DYNAMIC_NAME, CACHE_SIZE);
          return fetchRes;
        })
      });
    }).catch(async () => {
      const cache = await caches.open(CACHE_STATIC_NAME);
      const cachedResponse = await cache.match(OFFLINE_URL);
      return cachedResponse;
    })
  );
});