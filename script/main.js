if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/pwa-examples/a2hs/sw.js')
      .then(() => { console.log('Service Worker Registered'); });
  }