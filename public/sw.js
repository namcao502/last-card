// Minimal service worker for installability + an offline fallback for navigations.
// Last Card is real-time multiplayer, so we intentionally do NOT cache app chunks, API,
// or Firebase traffic - those always go to the network. We only cache the home shell so a
// fully-offline navigation shows something instead of the browser error page.
const CACHE = 'lastcard-shell-v1';
const OFFLINE_URL = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add(OFFLINE_URL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // Only intercept top-level navigations: network-first, fall back to the cached shell offline.
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
  }
  // Everything else passes through to the network untouched (live multiplayer data).
});
