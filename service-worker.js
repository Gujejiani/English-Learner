// Define a cache name
const CACHE_NAME = 'your-app-cache-v2';

// List of assets to cache
const urlsToCache = [
  'English-Learner/',
  'index.html',
  'static/css/main.31b8cf48.css',
  'static/js/main.12157825.js',
  // Add more URLs of your app's assets here
];

// Install service worker and cache assets

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Serve cached assets when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
