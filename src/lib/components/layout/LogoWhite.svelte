
<script lang="ts">
  import { page } from '$app/stores';
  
  export let containerClass = "w-full h-full";
  
  const logo = '/logo_white.svg';

  // Determine the href based on the current URL
  let href = '/app';  // default href
  if (page?.url) {
    const currentPath = page.url.pathname;
    const pathSegments = currentPath.split('/');
    if (pathSegments.length > 2) {
      href = '/' + pathSegments[pathSegments.length - 2];
    }
  }
</script>

<a href={href} class="logo-white-container {containerClass}">
  <img 
    src={logo} 
    alt="Roshapp" 
    class="logo-white-image"
  />
</a>

<style>
  .logo-white-container {
    @apply flex items-center justify-center;
    width: 100%;
    height: 100%;
  }
  
  .logo-white-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    max-width: 100%;
    max-height: 100%;
  }
</style>
