<script lang="ts">
  import { page } from '$app/stores';

  // Get user data from page store
  $: user = $page.data?.user;
</script>

<h1>Welcome to Customer Portal</h1>

{#if user}
  <p>Hello, {user.email}!</p>
  <p>Your role: {user.roles?.join(', ') || 'customer'}</p>
{:else}
  <p>Loading user data...</p>
{/if}

<div class="mt-4">
  <h2>Customer Features</h2>
  <ul>
    <li>View Services</li>
    <li>Book Appointments</li>
    <li>Manage Profile</li>
  </ul>
</div>