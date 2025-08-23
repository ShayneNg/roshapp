import { dev } from '$app/environment';

export async function handle({ event, resolve }) {
  if (dev && event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response('Not Found', { status: 404 });
  }
  return resolve(event);
}
