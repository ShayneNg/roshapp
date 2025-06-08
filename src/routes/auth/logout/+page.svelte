
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Logo from '$lib/components/layout/Logo.svelte';
  
  onMount(() => {
    // Redirect to login after 3 seconds
    const timer = setTimeout(() => {
      goto('/auth/login');
    }, 3000);
    
    // Cleanup timer on component destroy
    return () => clearTimeout(timer);
  });
</script>

<div class="min-h-screen flex items-center justify-center bg-background p-6">
  <div class="max-w-md w-full space-y-8 text-center">
    <div class="flex justify-center">
      <Logo />
    </div>
    
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-foreground">
        Logged Out Successfully
      </h1>
      
      <p class="text-muted-foreground">
        You have been successfully logged out. You will be redirected to the login page in a few seconds.
      </p>
      
      <div class="flex justify-center space-x-1 mt-6">
        <div class="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        <div class="h-2 w-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="h-2 w-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
      
      <p class="text-sm text-muted-foreground mt-4">
        If you are not redirected automatically, 
        <a href="/auth/login" class="text-primary hover:underline">click here to login</a>
      </p>
    </div>
  </div>
</div>
