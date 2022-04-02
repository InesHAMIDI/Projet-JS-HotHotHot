if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service worker registration succeeded:', registration)
        },
        /*catch*/ (error) => {
            console.log('Service worker registration failed:', error)
        }
    )
} 

else {
    console.log('Service workers are not supported.')
}

function  main(){
    const permission = document.getElementById('push-permission')
    if(!permission || 
        !('Notification' in window) ||
        !('ServiceWorker' in navigator)){
        return;
    }
    const button = document.createElement('button')
    button.innerText = 'Recevoir les notificatins'
    permission.appendChild(button)
    button.addEventListener('click')
}

function askPermission(){
    const permission =  Notification.requestPermission()
}

main()