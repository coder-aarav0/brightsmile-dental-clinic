// BrightSmile Dental Clinic - High Performance Cache Service Worker
// Automatically caches all images and media locally on the user's device for instant repeat loads (0ms latency).

const CACHE_NAME = 'brightsmile-images-v1';

// Static critical images to pre-cache immediately upon site installation
const PRECACHE_IMAGES = [
  '/assets/doctor-hero.webp',
  '/assets/logo.svg',
  '/services/Teeth Whitening.webp',
  '/services/Dental Implants.webp',
  '/services/Cosmetic Dentistry.webp',
  '/services/Emergency Care.webp',
  '/services/Preventive Care.webp',
  '/services/Family Dentistry.webp'
];

// Install Event: pre-cache critical images
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Fetch each image gracefully so a single failed request doesn't abort the worker
      return Promise.allSettled(
        PRECACHE_IMAGES.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Pre-cache failed for ${url}:`, err);
          })
        )
      );
    })
  );
});

// Activate Event: clean up any obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('brightsmile-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First strategy for all images and static media
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Check if request is an image (by destination, pathname, or common image extensions)
  const isImageRequest =
    request.destination === 'image' ||
    url.pathname.match(/\.(webp|png|jpg|jpeg|svg|gif|avif|ico)$/i) ||
    url.pathname.startsWith('/services/') ||
    url.pathname.startsWith('/assets/') ||
    url.hostname.includes('images.unsplash.com');

  if (isImageRequest && request.method === 'GET') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        // 1. Try local cache first (Lightning fast, 0 network latency)
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // 2. Fall back to network, and store newly fetched image in device cache
        try {
          const networkResponse = await fetch(request);
          // Only cache valid standard responses or opaque cross-origin image responses
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (fetchError) {
          console.warn('[SW] Network fetch failed for image:', request.url, fetchError);
          // Return cached response if available or let it fail
          return cachedResponse || Response.error();
        }
      })
    );
  }
});
