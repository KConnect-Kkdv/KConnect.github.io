const CACHE_NAME = 'kombathukadavu-cache-v1';

// List all files you want to work offline
const urlsToCache = [
  '/',
  '/add3.html',
  '/admin.html',
  '/logo.png',
  '/auto-icon.png',
  '/favicon.ico'
];

// Install service worker & cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Caching site files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch files from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Found in cache
      }
      return fetch(event.request).catch(() => {
        // Offline fallback page if needed
        return new Response(
          '<h1>You are offline</h1><p>Please check your internet connection.</p>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      });
    })
  );
});

// Clear old caches when updating
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});
