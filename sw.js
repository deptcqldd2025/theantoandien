/* Service Worker for VDC Safety Card PWA v38.1 */
const CACHE_NAME = 'vdc-safety-app-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Bước 1: Cài đặt và lưu các file cần thiết vào bộ nhớ đệm (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('VDC Cache Opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Bước 2: Kích hoạt và dọn dẹp bộ nhớ đệm cũ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Bước 3: Xử lý yêu cầu mạng - Ưu tiên lấy từ Cache để mờ link và chạy nhanh
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.event.request)
      .then(response => {
        // Trả về file từ cache nếu có, nếu không thì tải từ mạng
        return response || fetch(event.request);
      })
  );
});
