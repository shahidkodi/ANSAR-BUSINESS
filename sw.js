const CACHE = 'ptbrothers-v40';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The page itself is fetched from the network first, so a new version shows up
// on the next open instead of after two reloads. The cached copy is the
// fallback, which is what keeps the app working offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isPage = e.request.mode === 'navigate' ||
                 url.pathname.endsWith('/') ||
                 url.pathname.endsWith('/index.html') ||
                 url.pathname.endsWith('/manifest.webmanifest');

  if (isPage) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return resp;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Icons and everything else: cache first, refreshed in the background.
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached ||
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match('./index.html'))
    )
  );
});

// Lets the page ask this worker to step aside immediately.
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
