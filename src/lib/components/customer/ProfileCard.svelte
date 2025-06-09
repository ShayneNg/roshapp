
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  
  interface Props {
    width?: string;
    height?: string;
    user?: any;
  }
  
  let { width = "w-full", height = "h-64", user }: Props = $props();
</script>

<Card {width} {height} title="Profile Information" subtitle="Manage your personal details">
  {#snippet children()}
    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="user" size="lg" class="text-primary" />
        </div>
        <div>
          <h4 class="font-medium">{user?.username || 'Customer'}</h4>
          <p class="text-sm text-muted-foreground">{user?.email || 'customer@example.com'}</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-muted-foreground">Phone</label>
          <p class="text-sm">+1 (555) 123-4567</p>
        </div>
        <div>
          <label class="text-sm font-medium text-muted-foreground">Member Since</label>
          <p class="text-sm">January 2024</p>
        </div>
      </div>
      
      <button class="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
        Edit Profile
      </button>
    </div>
  {/snippet}
</Card>
