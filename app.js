if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service worker registration succeeded:', registration)
        },
       (error) => {
            console.log('Service worker registration failed:', error)
        })
}
else {
    console.log('Service workers are not supported.');
}

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
}
    
    subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, //tjrs true prcq le user voit les notifs
        applicationServerKey: await getPublicKey(),
    })
    key = saveSubscription(subscription)
}

async function getPublicKey(){
    const {key} = await fetch('/push/key', {
        headers:{
            Accept:'application/json'
        }
    }).then(r => r.json())
    return key;
}

/**
 * 
 * @param subscription
 * @returns {Promise<void>}
 */
async function saveSubscription(subscription){
    const {key} = await fetch('/push/subscribe', {
        method:'post',
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        body:JSON.stringify(subscription)
    }).then(r => r.json())
    return key;
}

main()