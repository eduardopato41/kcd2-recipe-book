// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
        .register('js/serviceWorker.js')
        .then(function() {
            console.log('Service Worker Registered!');
        })
        .catch(function(err) {
            console.log('Service Worker Failed to Register', err);
        });
    });
}

// WAKE LOCK API
// Variable to hold the wake lock
let wakeLock = null;

// Request the wake lock
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock is active!');

    // Listen for release
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// Request the lock when needed
requestWakeLock();