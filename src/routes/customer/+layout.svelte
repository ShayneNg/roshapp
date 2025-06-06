<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast } from 'svelte-sonner';

  onMount(() => {
    const flashMessage = getFlashMessage();
    if (flashMessage) {
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
  });
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
