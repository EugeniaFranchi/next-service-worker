const cacheName = 'v1';

// Instala el SW
const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};

// Activa el SW
const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();
  
  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

// Guarda en la cache los assets de la página en la que se encuentra el usuario
// Lo que no visita, no se guarda
const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      cacheClone(e)
      .catch(() => caches.match(e.request))
      .then((res) => res)
      );
    });
  };

//? Instala y activa el SW, y guarda en la cache los assets de la página en la que se encuentra el usuario
installEvent();
activateEvent();
fetchEvent();
