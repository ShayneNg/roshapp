<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import { Icon } from "$lib/icons/Icon.svelte";
</script>

<div class="min-h-screen grid grid-cols-1 lg:grid-cols-[250px_1fr] bg-white text-gray-900">
  <!-- Sidebar -->
  <aside class="border-r border-gray-200 p-6 bg-gray-50 space-y-4">
    <h2 class="text-lg font-semibold mb-4">Staff Menu</h2>
    <ul class="space-y-2">
      <li><a href="/staff" class="flex items-center gap-2 hover:text-blue-600">
        <Icon name="layout-dashboard" class="w-5 h-5" /> Dashboard</a></li>
      <li><a href="/staff/schedule" class="flex items-center gap-2 hover:text-blue-600">
        <Icon name="calendar" class="w-5 h-5" /> Schedule</a></li>
    </ul>
  </aside>

  <!-- Main content -->
  <main class={`${spacing.container} py-8`}>
    <slot />
  </main>
</div>
