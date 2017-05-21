this.addEventListener('install', function (event) {
  event.waitUntil(caches.open('spotify-client-v1').then(function (cache) {
    return cache.addAll([
      '/index.html',
      '/assets/',
      '/vendor.bundle.js',
      '/app.bundle.js'
    ]);
  }));
});

this.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request, {
    ignoreSearch: true
  }).then(function (res) {
    return res || fetch(event.request);
  }));
});