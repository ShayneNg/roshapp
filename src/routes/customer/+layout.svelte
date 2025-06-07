<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast } from 'svelte-sonner';

  onMount(() => {
    console.log('Customer layout mounted, checking for flash message...');
    
    // Wait for DOM to be fully ready
    setTimeout(() => {
      const flashMessage = getFlashMessage();
      if (flashMessage) {
        console.log('✅ Flash message found:', flashMessage);
        console.log('Attempting to show toast...');
        showToast(flashMessage);
      } else {
        console.log('❌ No flash message found');
      }
    }, 100);
  });
  
  function showToast(flashMessage) {
    console.log('showToast called with:', flashMessage);
    try {
      if (flashMessage.type === 'error') {
        console.log('Showing error toast');
        toast.error(flashMessage.message);
      } else if (flashMessage.type === 'success') {
        console.log('Showing success toast');
        toast.success(flashMessage.message);
      } else if (flashMessage.type === 'warning') {
        console.log('Showing warning toast');
        toast.warning(flashMessage.message);
      } else {
        console.log('Showing info toast');
        toast.info(flashMessage.message);
      }
      console.log('Toast should be visible now');
    } catch (error) {
      console.error('Error showing toast:', error);
    }
  }
</script>

<div class={`min-h-screen bg-gray-50 ${spacing.container}`}>
  <header class="py-6">
    <h1 class="text-2xl font-bold text-primary">Welcome, Customer</h1>
    <p class="text-sm text-muted-foreground">Track your bookings, promotions, and preferences</p>
  </header>

  <RoleLayout allow={['customer']}>
    <slot />
  </RoleLayout>
</div>
