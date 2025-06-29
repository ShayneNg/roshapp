<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast, Toaster } from 'svelte-sonner';
  import { page } from '$app/stores';
  import CustomerCard from '$lib/components/design/customerCard.svelte';
  import QRCode from '$lib/components/design/QRCode.svelte';
  import Icon from '$lib/components/icons/Icon.svelte';

  export const data = undefined;

  // Clear any unwanted flash messages on customer layout mount
  onMount(() => {
    // Clear flash message cookie if it contains access denied message
    const flashCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('flash_message='));

    if (flashCookie) {
      try {
        const cookieValue = flashCookie.split('=')[1];
        const message = JSON.parse(decodeURIComponent(cookieValue));

        // Clear access denied messages for customers in their own area
        if (message.message && message.message.includes('Access denied')) {
          document.cookie = 'flash_message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
          console.log('🧹 Cleared unwanted access denied flash message for customer');
        }
      } catch (error) {
        // Clear malformed cookie
        document.cookie = 'flash_message=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      }
    }
  });

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

<div class={`min-h-screen bg-background mt-8 ${spacing.container}`}>
  <RoleLayout allow={['customer']}>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Main Content (2/3 width) -->
      <div class="lg:col-span-2">
        <slot />
      </div>

      <!-- Right Column: Loyal Card + QR Code (1/3 width) -->
      <div class="space-y-6">
        <!-- Customer Loyalty Card -->
        <CustomerCard 
          class="sticky top-6 bg-card rounded-lg shadow-sm border border-border p-6"
          customerName={$page.data?.user?.email?.split('@')[0] || 'Valued Customer'}
          membershipLevel="Premium"
          memberSince="2024"
          loyaltyPoints={450}
          cardNumber="5699 8908 3326 5756"
        />

        <!-- QR Code Section -->
        <QRCode 
          data={null}
          isLoading={false}
          hasError={false}
          upcomingBooking={{
            service: "Gel Manicure",
            date: "Jan 25, 2024",
            time: "2:00 PM"
          }}
          customerName={$page.data?.user?.email?.split('@')[0] || 'Valued Customer'}
          size="md"
        />
      </div>
    </div>
  </RoleLayout>
</div>

<Toaster />

<style>
  .nav-item {
    @apply flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-muted transition-colors;
  }

  .nav-item.active {
    @apply bg-primary/10 text-primary font-medium;
  }

  .nav-item-small {
    @apply flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors;
  }

  .nav-item-small.active {
    @apply bg-primary/10 text-primary font-medium;
  }
</style>