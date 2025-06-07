
<script>
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('Root layout mounted - Toaster should be ready');
  });
</script>

<main>
  <slot />
</main>

<Toaster 
  position="top-right" 
  richColors={true}
  closeButton={true}
  duration={4000}
/>
</script>
