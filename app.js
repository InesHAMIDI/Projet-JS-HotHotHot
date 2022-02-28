if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(r => console.log("sw OK"));
}