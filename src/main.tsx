import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for lightning-fast local image caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[BrightSmile] Image cache service worker active:', reg.scope);
      })
      .catch((err) => {
        console.warn('[BrightSmile] Service worker registration failed:', err);
      });
  });
}

