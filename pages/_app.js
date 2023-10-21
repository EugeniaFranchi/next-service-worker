import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  // Registra el SW
  // Al registrarlo acá, va a tener acceso a todo el sitio: todos los assets, todas las páginas
  useEffect(() => {
    //? Si la API de ServiceWorker está soportada por el navegador y activa
    if ('serviceWorker' in navigator) {
      //? Registra el SW
      navigator.serviceWorker
        //? El service worker tiene que estar en /public para que sea accesible por el navegador
        //? Si queremos limitar el SW a una sola página, se especifica en el 'scope'
        //? Ej: { scope: '/docs' }
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => console.log('scope is: ', registration.scope));
    }

  }, []);

  return <Component {...pageProps} />;
}
