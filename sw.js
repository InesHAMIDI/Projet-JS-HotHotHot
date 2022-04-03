self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('HotHotHot').then((cache) => cache.addAll([
        '/Projet-JS-HotHotHot/index.html',
        '/Projet-JS-HotHotHot/app.js',
        '/Projet-JS-HotHotHot/scripts/grah.js',
        '/Projet-JS-HotHotHot/scripts/Sensor.js',
        '/Projet-JS-HotHotHot/scripts/SensorData.js',
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
        caches.match(e.request).then((response) =>
          response || fetch(e.request).then((response) =>
            caches.open('HotHotHot').then((cache)=> {
              cache.put(e.request, response.clone());
              return response;
            })
            
        ))
    
    );
  });
