const CACHE_NAME = 'cs1b-cache-v1';
const urlsToCache = [
  '/',
  '/alt_image.jpg',

  '/index.html',
  '/funds.html',
  '/savings.html',
  '/expenses.html',
  '/profile.html',

  '/style.css',
  '/function/hello.js',
  '/function/dashboard.js',
  '/function/expenses.js',
  '/function/funds.js',
  '/function/image_compressor.js',
  '/function/login.js',
  '/function/pwa.js',
  '/function/role.js',
  '/function/savings.js',
  '/icons/icon-192.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/asset/font/Helvetica.ttf',
  '/asset/img/admin_profile.jpg',
  '/asset/img/logo.png',
  '/asset/img/user_profile.jpg'
];

// Install event: cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event: serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
