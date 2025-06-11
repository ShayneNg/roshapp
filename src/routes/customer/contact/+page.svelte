<script lang="ts">
  import ContactCard from '$lib/components/ux/ContactCard.svelte';
</script>

<svelte:head>
  <title>Contact - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ContactCard width="w-full" height="h-96" />

    <!-- Quick Contact Form -->
    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Send us a Message</h3>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Subject</label>
          <input type="text" class="w-full px-3 py-2 border border-border rounded-md bg-background" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Message</label>
          <textarea rows="4" class="w-full px-3 py-2 border border-border rounded-md bg-background"></textarea>
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>