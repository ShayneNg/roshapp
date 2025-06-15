
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  
  export let data: any = null;
  export let isLoading: boolean = false;
  export let hasError: boolean = false;
  export let upcomingBooking: any = null;
  export const customerName: string = 'Customer';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32', 
    lg: 'w-40 h-40'
  };
  
  const iconSizes = {
    sm: 48,
    md: 64,
    lg: 80
  };
</script>

<div class="bg-card rounded-lg shadow-sm border border-border p-6">
  <h3 class="font-semibold text-lg mb-4 text-center text-foreground">Your QR Code</h3>
  
  <div class="flex justify-center mb-4">
    <div class="{sizeClasses[size]} bg-muted rounded-lg flex items-center justify-center">
      {#if hasError}
        <!-- Error State: Show QR icon -->
        <Icon name="QrCode" size={iconSizes[size]} class="text-red-500" />
      {:else if isLoading}
        <!-- Loading State -->
        <div class="animate-spin">
          <Icon name="Loader2" size={iconSizes[size]} class="text-muted-foreground" />
        </div>
      {:else if data && data.qrCodeUrl}
        <!-- Loaded State: Show actual QR code -->
        <img 
          src={data.qrCodeUrl} 
          alt="Customer QR Code" 
          class="w-full h-full object-contain rounded"
        />
      {:else}
        <!-- Empty State: Show SVG placeholder -->
        <svg 
          class="w-full h-full text-muted-foreground" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- QR Code pattern placeholder -->
          <rect x="10" y="10" width="15" height="15" fill="currentColor" opacity="0.3"/>
          <rect x="75" y="10" width="15" height="15" fill="currentColor" opacity="0.3"/>
          <rect x="10" y="75" width="15" height="15" fill="currentColor" opacity="0.3"/>
          
          <!-- Corner markers -->
          <rect x="12" y="12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"/>
          <rect x="77" y="12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"/>
          <rect x="12" y="77" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"/>
          
          <!-- Data pattern -->
          <rect x="30" y="15" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="35" y="15" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="45" y="15" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="55" y="15" width="3" height="3" fill="currentColor" opacity="0.6"/>
          
          <rect x="30" y="25" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="40" y="25" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="50" y="25" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="60" y="25" width="3" height="3" fill="currentColor" opacity="0.6"/>
          
          <rect x="15" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="25" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="35" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="45" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="55" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="65" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="75" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="85" y="35" width="3" height="3" fill="currentColor" opacity="0.6"/>
          
          <!-- More pattern elements -->
          <rect x="30" y="45" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="40" y="45" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="55" y="45" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="65" y="45" width="3" height="3" fill="currentColor" opacity="0.6"/>
          
          <rect x="15" y="55" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="30" y="55" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="45" y="55" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="60" y="55" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="75" y="55" width="3" height="3" fill="currentColor" opacity="0.6"/>
          
          <rect x="35" y="65" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="50" y="65" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="65" y="65" width="3" height="3" fill="currentColor" opacity="0.6"/>
          <rect x="80" y="65" width="3" height="3" fill="currentColor" opacity="0.6"/>
        </svg>
      {/if}
    </div>
  </div>
  
  {#if hasError}
    <p class="text-sm text-red-500 text-center">
      Failed to load QR code
    </p>
    <button 
      class="text-xs text-primary hover:underline text-center w-full mt-1"
      on:click={() => { hasError = false; isLoading = true; }}
    >
      Try again
    </button>
  {:else if isLoading}
    <p class="text-sm text-muted-foreground text-center">
      Loading your QR code...
    </p>
  {:else if upcomingBooking}
    <div class="bg-muted/50 rounded-lg p-3 mb-3">
      <h4 class="text-sm font-medium text-foreground mb-1">Upcoming Booking</h4>
      <p class="text-xs text-muted-foreground">{upcomingBooking.service}</p>
      <p class="text-xs text-muted-foreground">
        {upcomingBooking.date} at {upcomingBooking.time}
      </p>
    </div>
    <p class="text-sm text-muted-foreground text-center">
      Show this code at your appointment
    </p>
  {:else}
    <p class="text-sm text-muted-foreground text-center">
      Show this code at checkout for instant rewards
    </p>
  {/if}
</div>
