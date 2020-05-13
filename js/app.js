let deferredPrompt;
let floatingButton = document.querySelector('.floating-button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('Service worker registered!');
  });
}

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

window.addEventListener('appinstalled', (evt) => {
  floatingButton.style.display = 'none';
  console.log('pwa installed');
});
