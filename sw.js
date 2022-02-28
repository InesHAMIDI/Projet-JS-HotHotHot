self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('HotHotHot').then((cache) => cache.addAll([
        '/PROJET-JS-HOTHOTHOT/index.html',
        '/PROJET-JS-HOTHOTHOT/app.js',
        '/PROJET-JS-HOTHOTHOT/images/duck.jpg',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });
