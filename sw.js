const VERSION = 'v-02';
const CACHE_STATIC_NAME = `static-${VERSION}`;
const CACHE_DYNAMIC_NAME = `dynamic-${VERSION}`;
const CACHE_SIZE = 1000;
const OFFLINE_URL = '/offline.html';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/js/utils.js',
  '/js/app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  '/js/bannerInstall.js',
  '/services/common.js',
  '/services/movies.js',
  '/settings/api.js',
  '/js/home.js',
  '/css/styles.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/icon.png',
  '/images/not-found.png',
  '/images/icons/icon-16x16.png',
  '/images/icons/icon-20x20.png',
  '/images/icons/icon-29x29.png',
  '/images/icons/icon-32x32.png',
  '/images/icons/icon-40x40.png',
  '/images/icons/icon-48x48.png',
  '/images/icons/icon-50x50.png',
  '/images/icons/icon-55x55.png',
  '/images/icons/icon-57x57.png',
  '/images/icons/icon-58x58.png',
  '/images/icons/icon-60x60.png',
  '/images/icons/icon-64x64.png',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-76x76.png',
  '/images/icons/icon-80x80.png',
  '/images/icons/icon-87x87.png',
  '/images/icons/icon-88x88.png',
  '/images/icons/icon-100x100.png',
  '/images/icons/icon-114x114.png',
  '/images/icons/icon-120x120.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-167x167.png',
  '/images/icons/icon-172x172.png',
  '/images/icons/icon-180x180.png',
  '/images/icons/icon-196x196.png',
  '/images/icons/icon-216x216.png',
  '/images/icons/icon-256x256.png',
  '/images/icons/icon-512x512.png',
  '/images/icons/icon-1024x1024.png'
];

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(STATIC_FILES);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
      })
  );
});