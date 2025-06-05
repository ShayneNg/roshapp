<!-- src/lib/components/layout/RoleLayout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let allow: string[] = [];

  onMount(() => {
    const user = $page.data.user;
    if (!user || !user.roles?.some(role => allow.includes(role))) {
      goto('/forbidden'); // or /auth/login, or show slot fallback
    }
  });
</script>

<slot />
