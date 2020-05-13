const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v2';
const CACHE_SIZE = 50;
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/bannerInstall.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/fallback.html',
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

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(CACHE_DYNAMIC_NAME, CACHE_SIZE);
          return fetchRes;
        })
      });
    }).catch(() => {
      // if(evt.request.url.indexOf('.html') > -1){
        return caches.match('/fallback.html');
      // } 
    })
  );
});