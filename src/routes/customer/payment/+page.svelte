
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Payment - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900">Payment Methods</h1>
    <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
      Add Payment Method
    </button>
  </div>

  <div class="grid gap-4">
    <!-- Payment methods grid content -->
    <div class="bg-white rounded-lg border p-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-medium">•••• •••• •••• 1234</p>
          <p class="text-sm text-gray-500">Expires 12/27</p>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
