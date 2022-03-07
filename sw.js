self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('HotHotHot').then((cache) => cache.addAll([
        '/Projet-JS-HotHotHot/index.html',
        '/Projet-JS-HotHotHot/app.js',
        '/Projet-JS-HotHotHot/images/duck.png',
      ])),
    );
  });
  
  /*self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });*/

  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.open('mysite-dynamic').then(function(cache) {
        return cache.match(e.request).then(function (response) {
          return response || fetch(e.request).then(function(response) {
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
