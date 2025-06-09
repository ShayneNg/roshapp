<script lang="ts">
  import ProfileCard from '$lib/components/customer/ProfileCard.svelte';

  export let data;
</script>

<svelte:head>
  <title>Profile - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ProfileCard width="w-full" height="h-80" user={data.user} />

    <!-- Additional profile sections can be added here -->
    <div class="space-y-6">
      <!-- Security Settings -->
      <div class="bg-card border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Security Settings</h3>
        <div class="space-y-3">
          <button class="w-full text-left px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
            Change Password
          </button>
          <button class="w-full text-left px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  </div>
</div>