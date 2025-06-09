
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  
  interface Props {
    width?: string;
    height?: string;
  }
  
  let { width = "w-full", height = "h-64" }: Props = $props();
  
  const contactMethods = [
    { icon: 'phone', label: 'Phone Support', value: '+1 (555) 123-4567', action: 'Call Now' },
    { icon: 'mail', label: 'Email Support', value: 'support@roshapp.com', action: 'Send Email' },
    { icon: 'message-circle', label: 'Live Chat', value: 'Available 24/7', action: 'Start Chat' }
  ];
</script>

<Card {width} {height} title="Contact Support" subtitle="Get help when you need it">
  {#snippet children()}
    <div class="space-y-4">
      {#each contactMethods as method}
        <div class="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
          <div class="flex items-center space-x-3">
            <Icon name={method.icon} class="text-primary" />
            <div>
              <p class="font-medium text-sm">{method.label}</p>
              <p class="text-xs text-muted-foreground">{method.value}</p>
            </div>
          </div>
          <button class="text-xs text-primary hover:text-primary/80 transition-colors">
            {method.action}
          </button>
        </div>
      {/each}
      
      <div class="pt-4 border-t border-border">
        <button class="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
          <Icon name="help-circle" class="inline mr-2" size="sm" />
          FAQ & Help Center
        </button>
      </div>
    </div>
  {/snippet}
</Card>
