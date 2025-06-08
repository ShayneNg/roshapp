<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast, Toaster } from 'svelte-sonner';
  import { page } from '$app/stores';
  import CustomerCard from '$lib/components/design/customerCard.svelte';

  onMount(() => {
    setTimeout(() => {
      const flashMessage = getFlashMessage();
      if (flashMessage) {
        showToast(flashMessage);
      }
    }, 100);
  });

  function showToast(flashMessage) {
    if (flashMessage.type === 'error') {
      toast.error(flashMessage.message);
    } else if (flashMessage.type === 'success') {
      toast.success(flashMessage.message);
    } else if (flashMessage.type === 'warning') {
      toast.warning(flashMessage.message);
    } else {
      toast.info(flashMessage.message);
    }
  }
</script>

<div class={`min-h-screen bg-gray-50 ${spacing.container}`}>
  <header class="py-6">
    <h1 class="text-2xl font-bold text-primary">Welcome, Customer</h1>
    <p class="text-sm text-muted-foreground">Track your bookings, promotions, and preferences</p>
  </header>

  <RoleLayout allow={['customer']}>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Main Content (2/3 width) -->
      <div class="lg:col-span-2">
        <slot />
      </div>

      <!-- Right Column: Loyal Card + QR Code (1/3 width) -->
      <div class="space-y-6">
        <!-- Customer Loyalty Card -->
        <div class="sticky top-6">
          <CustomerCard 
            customerName={$page.data?.user?.email?.split('@')[0] || 'Valued Customer'}
            membershipLevel="Premium"
            memberSince="2024"
            loyaltyPoints={450}
            cardNumber="5699 8908 3326 5756"
          />
        </div>

        <!-- QR Code Section -->
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <h3 class="font-semibold text-lg mb-4 text-center">Your QR Code</h3>
          <div class="flex justify-center">
            <div class="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl mb-2">📱</div>
                <p class="text-xs text-gray-500">QR Code</p>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-600 text-center mt-3">
            Show this code at checkout for instant rewards
          </p>
        </div>
      </div>
    </div>
  </RoleLayout>
</div>

<Toaster />

<style>
  .nav-item {
    @apply flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors;
  }

  .nav-item.active {
    @apply bg-primary/10 text-primary font-medium;
  }

  .nav-item-small {
    @apply flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors;
  }

  .nav-item-small.active {
    @apply bg-primary/10 text-primary font-medium;
  }
</style>