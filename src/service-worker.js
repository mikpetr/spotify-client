this.addEventListener('install', function (event) {
  event.waitUntil(caches.open('spotify-client-v1').then(function (cache) {

    /**
     * @desc - Here is the list of files which must be cached
     */
    return cache.addAll([
      '/index.html',
      '/vendor.bundle.js',
      '/app.bundle.js',
      '/assets/fonts/Raleway-Medium.ttf',
      '/assets/fonts/Raleway-Regular.ttf',
      '/assets/fonts/Raleway-SemiBold.ttf',
      '/assets/images/Magnify@2x.png',
      '/assets/images/Page 1@2x.png',
      '/assets/images/gl-logo.png',
      '/assets/images/gl-text.png',
      '/assets/images/hero-img@2x.png'
    ]);
  }));
});

this.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request, {
    /**
     * @desc - This is for matching file URLs without query string
     */
    ignoreSearch: true
  }).then(function (res) {
    /**
     * @desc - First serve from cache, then try to load from network.
     */
    return res || fetch(event.request);
  }));
});