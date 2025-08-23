<script>
    import { page } from '$app/stores';
    import logoSvg from '$lib/assets/logo/logo.svg?raw';
    import logoIconSvg from '$lib/assets/logo/logo-icon.svg?raw';
    import logoDarkSvg from '$lib/assets/logo/logo-dark.svg?raw';
    
    export let variant = 'full'; // 'full' | 'icon' | 'horizontal'
    export let size = 'md'; // 'sm' | 'md' | 'lg' | 'xl'
    export let theme = 'light'; // 'light' | 'dark' | 'auto'
    export let href = '/'; // Make it clickable
    export let alt = 'Your Company Logo'; // SEO alt text
    export let className = '';
    
    // Size mappings for your brand system
    const sizeMap = {
      sm: 'h-6 w-auto', // 24px height
      md: 'h-8 w-auto', // 32px height  
      lg: 'h-12 w-auto', // 48px height
      xl: 'h-16 w-auto'  // 64px height
    };
    
    // Theme-aware logo selection
    $: currentTheme = theme === 'auto' ? 
      (typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light') : 
      theme;
      
    $: logoContent = variant === 'icon' ? logoIconSvg : 
                     currentTheme === 'dark' ? logoDarkSvg : logoSvg;
    
    // SEO structured data
    $: structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Your Company Name",
      "url": $page.url.origin,
      "logo": {
        "@type": "ImageObject",
        "url": `${$page.url.origin}/logo-512.png`,
        "width": 512,
        "height": 512
      }
    };
  </script>
  
  <svelte:head>
    <!-- SEO structured data -->
    {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
  </svelte:head>
  
  <!-- Logo wrapper with proper SEO attributes -->
  <a 
    {href}
    class="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md {className}"
    title="Go to {alt}"
    aria-label="Navigate to homepage - {alt}"
  >
    <!-- SVG with SEO optimization -->
    <div 
      class="logo-container {sizeMap[size]} text-primary-500 transition-colors duration-200 hover:text-primary-600"
      role="img"
      aria-label={alt}
    >
      {@html logoContent}
    </div>
    
    <!-- Hidden text for screen readers and SEO -->
    <span class="sr-only">{alt} - Navigate to homepage</span>
  </a>
  
  <style>
    .logo-container :global(svg) {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    
    /* Ensure proper scaling */
    .logo-container :global(svg) {
      max-width: 100%;
      height: auto;
    }
    
    /* Color inheritance for theming */
    .logo-container :global(svg path) {
      fill: currentColor;
    }
  </style>
  