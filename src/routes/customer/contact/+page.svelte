
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  
  export let data;
</script>

<svelte:head>
  <title>Contact - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-bold text-foreground">Contact Support</h1>

  <div class="grid md:grid-cols-2 gap-6">
    <!-- Contact Form -->
    <div class="bg-card rounded-lg border border-border p-6">
      <h2 class="text-lg font-semibold mb-4 text-foreground">Send us a message</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Subject</label>
          <input type="text" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Message</label>
          <textarea rows="4" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"></textarea>
        </div>
        <button type="submit" class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Send Message
        </button>
      </form>
    </div>

    <!-- Contact Info -->
    <div class="space-y-4">
      <div class="bg-card rounded-lg border border-border p-6">
        <h3 class="font-semibold mb-3 text-foreground">Get in touch</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <Icon name="Mail" size={20} class="text-muted-foreground" />
            <span class="text-sm text-foreground">support@company.com</span>
          </div>
          <div class="flex items-center gap-3">
            <Icon name="Phone" size={20} class="text-muted-foreground" />
            <span class="text-sm text-foreground">+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
