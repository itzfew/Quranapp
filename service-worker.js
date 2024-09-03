// service-worker.js

const CACHE_NAME = 'quran-cache-v1';
const urlsToCache = [
    '/', // Add other URLs to cache as needed
    '/index.html',
    '/styles.css',
    '/scripts.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Serve cached response
                }
                return fetch(event.request) // Fetch from network
                    .then(networkResponse => {
                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, networkResponse.clone()));
                        return networkResponse;
                    });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
