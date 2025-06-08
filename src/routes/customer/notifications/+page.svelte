
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Notifications - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
    <button class="text-sm text-primary hover:text-primary/80">
      Mark all as read
    </button>
  </div>

  <div class="space-y-3">
    <!-- Notification items -->
    <div class="bg-white rounded-lg border p-4 hover:bg-gray-50 transition-colors">
      <div class="flex gap-4">
        <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
        <div class="flex-1">
          <h3 class="font-medium text-gray-900">Booking Confirmed</h3>
          <p class="text-sm text-gray-600 mt-1">Your appointment on Jan 15, 2024 at 2:00 PM has been confirmed.</p>
          <p class="text-xs text-gray-400 mt-2">2 hours ago</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg border p-4">
      <div class="flex gap-4">
        <div class="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
        <div class="flex-1">
          <h3 class="font-medium text-gray-700">Loyalty Points Earned</h3>
          <p class="text-sm text-gray-600 mt-1">You earned 50 points from your recent service.</p>
          <p class="text-xs text-gray-400 mt-2">1 day ago</p>
        </div>
      </div>
    </div>
  </div>
</div>
