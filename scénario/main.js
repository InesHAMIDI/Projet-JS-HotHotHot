if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/PROJET-JS-HOTHOTHOT/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

