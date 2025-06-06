
<!-- src/routes/auth/forgot-password/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';

  export let data;
  export let form;

  let loading = false;
  let email = '';
  let showSuccess = false;

  function handleSubmit() {
    return async ({ result, update }: { result: any; update: any }) => {
      loading = true;

      if (result.type === 'success' && result.data?.success) {
        showSuccess = true;
        toast.success(result.data.message);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          goto('/auth/login');
        }, 3000);
      } else if (result.type === 'failure') {
        toast.error(result.data?.message || 'An error occurred');
      }

      loading = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>Forgot Password - RoshApp</title>
</svelte:head>

<div class="space-y-4 text-center">
  <h1 class="text-2xl font-bold tracking-tight">Forgot Password</h1>
  <p class="text-sm text-muted-foreground">
    Enter your email address and we'll send you instructions to reset your password
  </p>
</div>

{#if showSuccess}
  <div class="p-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md text-center">
    <h3 class="font-medium">Check your email</h3>
    <p class="mt-1">We've sent password reset instructions to your email address.</p>
    <p class="mt-2 text-xs">Redirecting to login page in a few seconds...</p>
  </div>
{:else}
  <form method="POST" use:enhance={handleSubmit} class="space-y-5">
    <input type="hidden" name="csrf" value={data.csrf || ''} />

    {#if form?.message && !form?.success}
      <div class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
        {form.message}
      </div>
    {/if}

    <div class="space-y-2">
      <Label for="email">Email Address</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        bind:value={email}
        required
      />
    </div>

    <Button class="w-full" type="submit" disabled={loading}>
      {#if loading}
        <span class="animate-spin mr-2">⏳</span>
        Sending Instructions...
      {:else}
        Send Reset Instructions
      {/if}
    </Button>
  </form>
{/if}

<div class="text-center text-sm text-muted-foreground">
  Remember your password? <a href="/auth/login" class="text-primary underline">Back to Login</a>
</div>
