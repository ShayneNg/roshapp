<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast } from 'svelte-sonner';
  import { Icon } from "$lib/icons/Icon.svelte";
  import { page } from '$app/stores';

  onMount(() => {
    const flashMessage = getFlashMessage();
    if (flashMessage) {
      console.log('Staff flash message found:', flashMessage);
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

  const navLinks = [
    { href: '/staff', icon: 'layout-dashboard', label: 'Dashboard' },
    { href: '/staff/profile', icon: 'user', label: 'Profile' },
    { href: '/staff/schedule', icon: 'calendar-days', label: 'Schedule' },
    { href: '/staff/booking', icon: 'calendar-check', label: 'Bookings' },
    { href: '/staff/task', icon: 'check-square', label: 'Tasks' },
    { href: '/staff/report', icon: 'bar-chart-2', label: 'Reports' }
  ];
</script>

<div class="min-h-screen grid grid-cols-[220px_1fr] bg-white text-gray-900">
  <aside class="border-r border-gray-200 p-6 bg-gray-50">
    <h2 class="text-lg font-semibold mb-4">Staff Menu</h2>
    <ul class="space-y-2">
      {#each navLinks as { href, icon, label }}
        <li>
          <a href={href} class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 text-sm {($page.url.pathname === href) ? 'font-semibold text-blue-600' : 'text-gray-700'}">
            <Icon name={icon} class="w-4 h-4" /> {label}
          </a>
        </li>
      {/each}
    </ul>
  </aside>

  <RoleLayout allow={['staff']}>
    <main class={`${spacing.container} py-6`}>
      <slot />
    </main>
  </RoleLayout>  
</div>