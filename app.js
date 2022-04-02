/*if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service worker registration succeeded:', registration)
        },
       (error) => {
    console.log('Service worker registration failed:', error)
}
)
} 

else {
    console.log('Service workers are not supported.')
}*/

//pour les notifs
function  main(){
    const permission = document.getElementById('push-permission')
    if(!permission || 
        !('Notification' in window) ||
        !('ServiceWorker' in navigator) ||
        Notification.permission !== 'default'){
        return;
    }
    const button = document.createElement('button')
    button.innerText = 'Recevoir les notificatins'
    permission.appendChild(button)
    button.addEventListener('click', askPermission)
}

async function askPermission(){
    const permission = await Notification.requestPermission()
    if(permission === 'granted'){
        registerServiceWorker()
    }
}
async function registerServiceWorker(){
    const registration = await navigator.serviceWorker.register('sw.js')
    const subscription = await registration.pushManager.getSubscription();
    console.log(subscription);
}

main()