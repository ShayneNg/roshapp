
<script>
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
  import { ModeWatcher } from "mode-watcher";
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('Root layout mounted - Toaster should be ready');
  });
</script>

<main>
  <slot />
  <ModeWatcher />
</main>

<Toaster 
  position="top-right" 
  richColors={true}
  closeButton={true}
  duration={4000}
/>
