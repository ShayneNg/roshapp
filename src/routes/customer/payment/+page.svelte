
<script lang="ts">
  import PaymentCard from '$lib/components/customer/PaymentCard.svelte';
</script>

<svelte:head>
  <title>Payment - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <PaymentCard width="w-full" height="h-96" />
    
    <!-- Transaction History -->
    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div class="space-y-3">
        <div class="flex justify-between items-center py-2 border-b border-border">
          <span class="text-sm">Service Payment</span>
          <span class="text-sm font-medium">-$75.00</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-border">
          <span class="text-sm">Wallet Top-up</span>
          <span class="text-sm font-medium text-success">+$100.00</span>
        </div>
      </div>
    </div>
  </div>
</div>
