<script lang="ts">
  import AuthForm from '$lib/components/forms/AuthForm.svelte';

  export let data: pageData;

</script>

<div class="space-y-4 text-center">
  <h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
  <p class="text-sm text-muted-foreground">Please enter your credentials to sign in</p>
</div>

<AuthForm type="login" csrf={data.csrf} />

<!-- Optional: extra login options -->
<div class="text-center text-sm text-muted-foreground">
  Don't have an account? <a href="/auth/register" class="text-primary hover:underline">Register here</a>
</div>