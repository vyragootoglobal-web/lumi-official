// Cloudflare Worker example
addEventListener('fetch', event => {
  event.respondWith(new Response("Worker OK"));
});
