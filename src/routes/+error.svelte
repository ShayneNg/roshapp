
<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '$lib/components/icons/Icon.svelte';
  import { goto } from '$app/navigation';

  // Determine error type based on status
  $: status = $page.status;
  $: is404 = status === 404;
  $: is500 = status >= 500;
  
  // Error content
  $: errorContent = getErrorContent(status);
  
  function getErrorContent(status: number) {
    if (status === 404) {
      return {
        title: "Page Not Found",
        subtitle: "Sorry, we couldn't find the page you're looking for.",
        description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        buttonText: "Go Home",
        action: () => goto('/')
      };
    } else if (status >= 500) {
      return {
        title: "Server Error",
        subtitle: "We're experiencing some technical difficulties.",
        description: "Our team has been notified and is working to fix this issue. Please try again in a few moments.",
        buttonText: "Try Again",
        action: () => window.location.reload()
      };
    } else {
      return {
        title: "Something Went Wrong",
        subtitle: "An unexpected error occurred.",
        description: "Please try refreshing the page or contact support if the problem persists.",
        buttonText: "Go Home",
        action: () => goto('/')
      };
    }
  }
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <div class="max-w-md w-full text-center space-y-8">
    
    <!-- SVG Illustration -->
    <div class="flex justify-center">
      {#if is404}
        <!-- 404 SVG -->
        <svg class="w-64 h-64 text-primary/20" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="120" stroke="currentColor" stroke-width="2" fill="none" />
          <path d="M160 130 L240 170 M160 170 L240 130" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <circle cx="170" cy="120" r="8" fill="currentColor"/>
          <circle cx="230" cy="120" r="8" fill="currentColor"/>
          <path d="M170 200 Q200 220 230 200" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
          <text x="200" y="260" text-anchor="middle" class="fill-current text-6xl font-bold">404</text>
        </svg>
      {:else if is500}
        <!-- 500 SVG -->
        <svg class="w-64 h-64 text-primary/20" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="80" width="200" height="140" rx="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <rect x="120" y="100" width="160" height="100" rx="5" fill="currentColor" opacity="0.1"/>
          <circle cx="280" cy="90" r="4" fill="currentColor"/>
          <path d="M140 120 L260 120 M140 140 L220 140 M140 160 L240 160" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M180 250 L200 270 L220 250" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
          <text x="200" y="50" text-anchor="middle" class="fill-current text-4xl font-bold">500</text>
        </svg>
      {:else}
        <!-- Generic Error SVG -->
        <svg class="w-64 h-64 text-primary/20" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="100" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M170 130 L230 130 M200 110 L200 170" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          <circle cx="200" cy="190" r="4" fill="currentColor"/>
          <text x="200" y="260" text-anchor="middle" class="fill-current text-5xl font-bold">!</text>
        </svg>
      {/if}
    </div>

    <!-- Error Content -->
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-foreground">{errorContent.title}</h1>
      <p class="text-lg text-muted-foreground">{errorContent.subtitle}</p>
      <p class="text-sm text-muted-foreground leading-relaxed">{errorContent.description}</p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button 
        on:click={errorContent.action}
        class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        {errorContent.buttonText}
      </button>
      
      {#if !is500}
        <button 
          on:click={() => history.back()}
          class="px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors font-medium"
        >
          Go Back
        </button>
      {/if}
    </div>

    <!-- Additional Help -->
    <div class="pt-8 border-t border-border">
      <p class="text-xs text-muted-foreground">
        Error Code: {status} • Need help? 
        <button 
          on:click={() => goto('/customer/contact')}
          class="text-primary hover:underline"
        >
          Contact Support
        </button>
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  svg text {
    font-family: inherit;
  }
</style>
