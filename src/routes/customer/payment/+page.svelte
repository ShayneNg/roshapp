
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  
  export let data;
</script>

<svelte:head>
  <title>Payment - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-foreground">Payment Methods</h1>
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
      Add Payment Method
    </button>
  </div>

  <div class="grid gap-4">
    <!-- Payment methods grid content -->
    <div class="bg-card rounded-lg border border-border p-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-8 bg-muted rounded flex items-center justify-center">
          <Icon name="CreditCard" size={24} class="text-muted-foreground" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-foreground">•••• •••• •••• 1234</p>
          <p class="text-sm text-muted-foreground">Expires 12/27</p>
        </div>
        <button class="text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="MoreVertical" size={20} />
        </button>
      </div>
    </div>
  </div>
</div>
