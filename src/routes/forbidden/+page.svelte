<!-- src/routes/forbidden/+page.svelte -->
<script>
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (message === 'unauthorized') {
      toast.warning('You were redirected because you tried to access a forbidden page.');
      history.replaceState(null, '', window.location.pathname); // Removes the query param
    }
  });
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4">
  <div class="text-red-600 text-6xl">🚫</div>
  <h1 class="text-2xl font-bold">Access Forbidden</h1>
  <p class="text-muted-foreground max-w-md">
    You don't have permission to view this page. If you think this is a mistake, please contact support or an administrator.
  </p>

  <div class="flex gap-4 flex-wrap justify-center">
    <Button on:click={() => goto('/')}>Go to Home</Button>
    <Button variant="outline" on:click={() => goto('/customer')}>Try Customer View</Button>
  </div>
</div>
