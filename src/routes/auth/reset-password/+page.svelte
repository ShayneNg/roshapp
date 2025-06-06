
<!-- src/routes/auth/reset-password/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from 'svelte-sonner';

  export let data;
  export let form;

  let loading = false;
  let password = '';
  let confirmPassword = '';

  function handleSubmit() {
    return async ({ result, update }: { result: any; update: any }) => {
      loading = true;

      if (result.type === 'redirect') {
        toast.success('Password reset successfully! Please log in with your new password.');
      } else if (result.type === 'failure') {
        toast.error(result.data?.message || 'An error occurred');
      }

      loading = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>Reset Password - RoshApp</title>
</svelte:head>

<div class="space-y-4 text-center">
  <h1 class="text-2xl font-bold tracking-tight">Reset Password</h1>
  <p class="text-sm text-muted-foreground">
    Enter your new password below
  </p>
</div>

<form method="POST" use:enhance={handleSubmit} class="space-y-5">
  <input type="hidden" name="csrf" value={data.csrf || ''} />
  <input type="hidden" name="tokenId" value={data.tokenId} />
  <input type="hidden" name="rawToken" value={data.rawToken} />

  {#if form?.message && !form?.success}
    <div class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {form.message}
    </div>
  {/if}

  <div class="space-y-2">
    <Label for="password">New Password</Label>
    <Input
      id="password"
      name="password"
      type="password"
      placeholder="Enter your new password"
      bind:value={password}
      required
    />
  </div>

  <div class="space-y-2">
    <Label for="confirmPassword">Confirm New Password</Label>
    <Input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      placeholder="Confirm your new password"
      bind:value={confirmPassword}
      required
    />
  </div>

  {#if password && confirmPassword && password !== confirmPassword}
    <p class="text-red-500 text-xs italic">Passwords do not match.</p>
  {/if}

  <Button class="w-full" type="submit" disabled={loading}>
    {#if loading}
      <span class="animate-spin mr-2">⏳</span>
      Resetting Password...
    {:else}
      Reset Password
    {/if}
  </Button>
</form>

<div class="text-center text-sm text-muted-foreground">
  Remember your password? <a href="/auth/login" class="text-primary underline">Back to Login</a>
</div>
