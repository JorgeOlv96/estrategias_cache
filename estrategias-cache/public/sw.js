// Variables de cache
const CACHE_DYNAMIC = 'dynamic-v2'; // Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v2';   // App shell
const CACHE_INMUTABLE = 'inmutable-v1'; // CDN de terceros. LIBRERIAS

// Limpiar cache
const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(() => limpiarCache(cacheName, numberItem));
                    }
                });
        });
};

// Evento install
self.addEventListener('install', event => {
    const cachePromise = caches.open(CACHE_STATIC).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/js/app.js',
            '/sw.js',
            '/static/js/bundle.js',
            '/favicon.ico',
            '/not-found.html',
        ]);
    });

    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => {
        return cache.addAll([
            'https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Roboto:wght@100&display=swap'
        ]);
    });

    event.waitUntil(Promise.all([cachePromise, cacheInmutable]));
});

// Evento fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        // Intentar la red y si falla, servir desde la caché
        fetch(event.request)
            .then(response => {
                return response;
            })
            .catch(() => {
                return caches.match('/not-found.html');
            })
    );
});
