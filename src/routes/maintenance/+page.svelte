
<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/components/icons/Icon.svelte';
  
  let currentTime = '';
  
  onMount(() => {
    const updateTime = () => {
      currentTime = new Date().toLocaleTimeString();
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Maintenance - We'll be back soon</title>
  <meta name="description" content="Site is temporarily under maintenance. We'll be back soon." />
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <div class="max-w-lg w-full text-center space-y-8">
    
    <!-- Maintenance SVG -->
    <div class="flex justify-center">
      <svg class="w-80 h-64 text-primary/20" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Main server/computer -->
        <rect x="150" y="100" width="200" height="120" rx="8" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="170" y="120" width="160" height="80" rx="4" fill="currentColor" opacity="0.05"/>
        
        <!-- Screen content lines -->
        <path d="M190 140 L310 140 M190 155 L280 155 M190 170 L330 170" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        
        <!-- Tools around the server -->
        <!-- Wrench -->
        <g transform="translate(100,80) rotate(-30)">
          <rect x="0" y="0" width="30" height="8" rx="4" fill="currentColor" opacity="0.3"/>
          <rect x="25" y="-2" width="8" height="12" rx="2" fill="currentColor" opacity="0.3"/>
        </g>
        
        <!-- Screwdriver -->
        <g transform="translate(380,120) rotate(45)">
          <rect x="0" y="0" width="40" height="4" rx="2" fill="currentColor" opacity="0.3"/>
          <rect x="35" y="-3" width="8" height="10" rx="1" fill="currentColor" opacity="0.3"/>
        </g>
        
        <!-- Gear -->
        <g transform="translate(120,200)">
          <circle cx="15" cy="15" r="12" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
          <circle cx="15" cy="15" r="6" fill="currentColor" opacity="0.2"/>
          <path d="M15 3 L15 27 M3 15 L27 15 M8.5 8.5 L21.5 21.5 M8.5 21.5 L21.5 8.5" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        </g>
        
        <!-- Progress indicator -->
        <rect x="170" y="240" width="160" height="8" rx="4" stroke="currentColor" stroke-width="1" fill="none"/>
        <rect x="172" y="242" width="80" height="4" rx="2" fill="currentColor" opacity="0.6"/>
        
        <!-- Status dots -->
        <circle cx="180" cy="260" r="3" fill="currentColor" opacity="0.8"/>
        <circle cx="200" cy="260" r="3" fill="currentColor" opacity="0.6"/>
        <circle cx="220" cy="260" r="3" fill="currentColor" opacity="0.4"/>
        
        <!-- Text -->
        <text x="250" y="300" text-anchor="middle" class="fill-current text-lg font-semibold opacity-60">Maintenance in Progress</text>
      </svg>
    </div>

    <!-- Content -->
    <div class="space-y-6">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold text-foreground">Under Maintenance</h1>
        <p class="text-lg text-muted-foreground">We're making some improvements</p>
      </div>
      
      <div class="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
        <div class="flex items-center justify-center space-x-2 text-primary">
          <Icon name="settings" size="sm" class="animate-spin" />
          <span class="text-sm font-medium">System Upgrade in Progress</span>
        </div>
        
        <p class="text-sm text-muted-foreground leading-relaxed">
          Our team is currently performing scheduled maintenance to improve your experience. 
          We'll be back online shortly with enhanced performance and new features.
        </p>
      </div>
      
      <!-- Estimated time -->
      <div class="space-y-3">
        <div class="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="clock" size="sm" />
          <span>Estimated completion: ~30 minutes</span>
        </div>
        
        <div class="text-xs text-muted-foreground">
          Current time: {currentTime}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-4">
      <button 
        on:click={() => window.location.reload()}
        class="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
      >
        <div class="flex items-center justify-center space-x-2">
          <Icon name="refresh-cw" size="sm" />
          <span>Check Again</span>
        </div>
      </button>
      
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="mailto:support@yourapp.com"
          class="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm font-medium"
        >
          Contact Support
        </a>
        <a 
          href="https://status.yourapp.com" 
          target="_blank"
          class="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm font-medium"
        >
          Status Page
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="pt-6 border-t border-border text-xs text-muted-foreground">
      Thank you for your patience while we improve our services.
    </div>
  </div>
</div>

<style lang="scss">
  svg text {
    font-family: inherit;
  }
  
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  
  svg circle:nth-of-type(4) {
    animation: pulse-dot 1.5s ease-in-out infinite;
  }
  
  svg circle:nth-of-type(5) {
    animation: pulse-dot 1.5s ease-in-out infinite 0.3s;
  }
  
  svg circle:nth-of-type(6) {
    animation: pulse-dot 1.5s ease-in-out infinite 0.6s;
  }
</style>
