let deferredPrompt;
let floatingButton = document.querySelector('.floating-button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service worker registered!');
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

window.addEventListener('appinstalled', () => {
  floatingButton.style.display = 'none';
  console.log('pwa installed');
});
