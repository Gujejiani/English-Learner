// Define a cache name
const CACHE_NAME = 'your-app-cache';

// List of assets to cache
const urlsToCache = [
  'English-Learner/',
  'English-Learner/index.html',
  'English-Learner/static/css/main.css',
  'English-Learner/static/js/main.js',
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
