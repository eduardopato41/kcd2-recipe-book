var assets = [
    '/',
    '/index.html',
    '/js/app.js'
];

self.addEventListener('install', function(installEvent) {
    installEvent.waitUntil(
        caches.open('kcd2-recipes').then(function(cache) {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', function(fetchEvent) {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(function(response) {
            return res || fetch(fetchEvent.request);
        })
    );
});