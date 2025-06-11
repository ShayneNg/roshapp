<script lang="ts">
  import NotificationsCard from '$lib/components/ux/NotificationsCard.svelte';
</script>

<svelte:head>
  <title>Notifications - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <NotificationsCard width="w-full" height="h-96" />

    <!-- Notification Settings -->
    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Notification Settings</h3>
      <div class="space-y-4">
        <label class="flex items-center space-x-3">
          <input type="checkbox" class="rounded border-border" checked />
          <span class="text-sm">Email notifications</span>
        </label>
        <label class="flex items-center space-x-3">
          <input type="checkbox" class="rounded border-border" checked />
          <span class="text-sm">SMS notifications</span>
        </label>
        <label class="flex items-center space-x-3">
          <input type="checkbox" class="rounded border-border" />
          <span class="text-sm">Push notifications</span>
        </label>
      </div>
    </div>
  </div>
</div>