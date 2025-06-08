<script lang="ts">
  import AuthForm from '$lib/components/forms/AuthForm.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="space-y-4 text-center">
  <h1 class="text-2xl font-bold tracking-tight">Create Your Account</h1>
  <p class="text-sm text-muted-foreground">Please fill in the details below to get started</p>
</div>

<AuthForm type="register" csrf={data.csrf} />

<!-- Link back to login -->
<div class="text-center text-sm text-muted-foreground">
  Already have an account? <a href="/auth/login" class="text-primary hover:underline">Sign in here</a>
</div>

<div class="text-center text-sm text-muted-foreground">
  Already have an account? <a href="/auth/login" class="text-primary underline">Login here</a>
</div>