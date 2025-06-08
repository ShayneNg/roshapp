<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Redirect to user-specific customer route
  onMount(() => {
    const userId = $page.data?.user?.id;
    if (userId) {
      goto(`/customer/${userId}`, { replaceState: true });
    } else {
      // If no user data, redirect to login
      goto('/auth/login', { replaceState: true });
    }
  });
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center">
  <div class="text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
    <p class="text-muted-foreground">Redirecting to your dashboard...</p>
  </div>
</div>