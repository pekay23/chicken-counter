self.addEventListener('fetch', function(event) {
    // A simple pass-through for now
    event.respondWith(fetch(event.request));
});
