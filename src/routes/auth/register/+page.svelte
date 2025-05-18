<script lang="ts">
  import AuthForm from '$lib/components/forms/AuthForm.svelte';
</script>

<div class="space-y-4 text-center">
  <h1 class="text-2xl font-bold tracking-tight">Create Your Account</h1>
  <p class="text-sm text-muted-foreground">Start managing your appointments with us</p>
</div>

<AuthForm type="register" />

<div class="text-center text-sm text-muted-foreground">
  Already have an account? <a href="/auth/login" class="text-primary underline">Login here</a>
</div>
