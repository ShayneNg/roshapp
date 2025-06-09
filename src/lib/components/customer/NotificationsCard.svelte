
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  
  interface Props {
    width?: string;
    height?: string;
  }
  
  let { width = "w-full", height = "h-64" }: Props = $props();
  
  const notifications = [
    { type: 'booking', message: 'Appointment confirmed for tomorrow', time: '2 hours ago' },
    { type: 'payment', message: 'Payment processed successfully', time: '1 day ago' },
    { type: 'reminder', message: 'Upcoming appointment reminder', time: '2 days ago' }
  ];
</script>

<Card {width} {height} title="Notifications" subtitle="Recent updates and alerts">
  {#snippet children()}
    <div class="space-y-3">
      {#each notifications as notification}
        <div class="flex items-start space-x-3 p-3 border border-border rounded-lg">
          <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="bell" size="sm" class="text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium">{notification.message}</p>
            <p class="text-xs text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      {/each}
      
      <button class="w-full text-sm text-primary hover:text-primary/80 transition-colors">
        View All Notifications
      </button>
    </div>
  {/snippet}
</Card>
