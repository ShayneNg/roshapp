
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  
  interface Props {
    width?: string;
    height?: string;
  }
  
  let { width = "w-full", height = "h-64" }: Props = $props();
</script>

<Card {width} {height} title="Payment Methods" subtitle="Manage your payment options">
  {#snippet children()}
    <div class="space-y-4">
      <div class="border border-border rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Icon name="credit-card" class="text-primary" />
            <div>
              <p class="font-medium">•••• •••• •••• 4242</p>
              <p class="text-sm text-muted-foreground">Expires 12/25</p>
            </div>
          </div>
          <span class="text-xs bg-success/10 text-success px-2 py-1 rounded">Default</span>
        </div>
      </div>
      
      <button class="w-full px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
        <Icon name="plus" class="inline mr-2" size="sm" />
        Add Payment Method
      </button>
      
      <div class="pt-4 border-t border-border">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Wallet Balance</span>
          <span class="font-medium">$125.50</span>
        </div>
      </div>
    </div>
  {/snippet}
</Card>
