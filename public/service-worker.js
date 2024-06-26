// Define a cache name
const CACHE_NAME = 'your-app-cache-v2';

// List of assets to cache
const urlsToCache = [
  './',
  'index.html',
  'static/css/{{HASHED_CSS_URL}}',
  'static/js/{{HASHED_JS_URL}}',
  'assets/english.png',
  'assets/georgian.png',
  'logo192.png',
  'logo512.png',
  'manifest.json',
  'favicon.ico',
  
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
