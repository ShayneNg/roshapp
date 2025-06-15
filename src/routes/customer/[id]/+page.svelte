<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/components/icons/Icon.svelte';

  // This page should redirect immediately, but show loading state briefly
  onMount(() => {
    console.log('🔄 Middleware route loaded - redirecting to username route...');
  });

  </script>

<svelte:head>
  <title>Redirecting...</title>
</svelte:head>

<!-- Loading state for middleware redirect -->
<div class="min-h-screen flex items-center justify-center bg-background">
  <div class="text-center space-y-4">
    <div class="w-12 h-12 mx-auto">
      <Icon name="Loader2" size={48} class="text-primary animate-spin" />
    </div>
    <h2 class="text-xl font-semibold text-foreground">Redirecting to your profile...</h2>
    <p class="text-muted-foreground">Please wait a moment</p>
  </div>
</div>