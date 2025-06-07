
<script>
  import '../app.css';
  import { Toaster } from 'svelte-sonner';
</script>

<main>
  <slot />
</main>

<Toaster position="top-right" />
