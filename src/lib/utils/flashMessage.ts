
// Flash message utility for handling temporary messages via cookies
import { browser } from '$app/environment';

export interface FlashMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// Get flash message from cookie and remove it
export function getFlashMessage(): FlashMessage | null {
  if (!browser) return null;
  
  const flashCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('flash_message='));
    
  if (!flashCookie) return null;
  
  try {
    const message = JSON.parse(decodeURIComponent(flashCookie.split('=')[1]));
    
    // Remove the cookie after reading
    document.cookie = 'flash_message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    return message;
  } catch {
    return null;
  }
}

// Set flash message via cookie (client-side)
export function setFlashMessage(message: FlashMessage) {
  if (!browser) return;
  
  document.cookie = `flash_message=${encodeURIComponent(JSON.stringify(message))}; path=/; max-age=60; SameSite=Lax`;
}
