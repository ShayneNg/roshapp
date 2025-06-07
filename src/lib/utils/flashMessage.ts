
// Flash message utility for handling temporary messages via cookies
import { browser } from '$app/environment';

export interface FlashMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// Get flash message from cookie and remove it
export function getFlashMessage(): FlashMessage | null {
  if (!browser) return null;
  
  // Try multiple times in case of timing issues
  for (let attempt = 0; attempt < 3; attempt++) {
    const flashCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('flash_message='));
      
    if (flashCookie) {
      try {
        const cookieValue = flashCookie.split('=')[1];
        const message = JSON.parse(decodeURIComponent(cookieValue));
        
        // Remove the cookie after reading
        document.cookie = 'flash_message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        
        return message;
      } catch (error) {
        console.error('Error parsing flash message cookie:', error);
        // Clear malformed cookie
        document.cookie = 'flash_message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        return null;
      }
    }
    
    // Small delay before retry for timing issues
    if (attempt < 2) {
      // Synchronous delay
      const start = Date.now();
      while (Date.now() - start < 50) {
        // Wait 50ms
      }
    }
  }
  
  return null;
}

// Set flash message via cookie (client-side)
export function setFlashMessage(message: FlashMessage) {
  if (!browser) return;
  
  document.cookie = `flash_message=${encodeURIComponent(JSON.stringify(message))}; path=/; max-age=60; SameSite=Lax`;
}
