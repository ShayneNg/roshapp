<script lang="ts">
  import { spacing } from "$lib/config/spacing";
</script>

<div class={`min-h-screen bg-gray-50 ${spacing.container}`}>
  <header class="py-6">
    <h1 class="text-2xl font-bold text-primary">Welcome, Customer</h1>
    <p class="text-sm text-muted-foreground">Track your bookings, promotions, and preferences</p>
  </header>

  <slot />
</div>
