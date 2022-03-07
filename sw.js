self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('HotHotHot').then((cache) => cache.addAll([
        'index.html',
        'app.js',
        'images/duck.jpg',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
