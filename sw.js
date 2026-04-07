// sw.js - Service Worker Básico
const CACHE_NAME = 'cernealto-pwa-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css', // Adicione se tiver um arquivo CSS externo
                '/js/main.js',
                '/img/favicon.webp',
                '/img/cernealto1.webp'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});