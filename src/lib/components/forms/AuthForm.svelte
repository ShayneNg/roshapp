<script lang="ts">
  // Core Svelte utilities
  import { createEventDispatcher } from 'svelte';

  // Form validation with Zod
  import { z } from 'zod';

  // ShadCN-Svelte UI components
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from "svelte-sonner";

  // Auth providers (social buttons)
  import AuthOptions from '$lib/components/design/authOptions.svelte';

  // Navigation helper
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  // Props: define form type
  export let type: 'login' | 'register' = 'login';

  // Form validation schema using Zod
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    // username: z.string().min(3).max(20).optional(),
    password: z.string().min(6, { message: 'Password too short' })
  });

  // Local form state
  let form = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  // Loading state for submit button
  let loading = false;

  // Error state
  let errorMessage = '';
  let showError = false;

  // Event dispatcher for parent communication
  const dispatch = createEventDispatcher();

  let formEl: HTMLFormElement;

  function handleFormEnhance() {
    return async ({ result, update }: { result: any; update: any }) => {
      loading = true;

      if (result.type === 'success' && result.data?.success === true) {
        // Clear any previous errors
        showError = false;
        errorMessage = '';

        toast.success(result.data.message || 'Welcome back!');

        // Delay a bit before navigating
        const role = result.data.role;
        setTimeout(() => {
          if (role === 'staff') goto('/staff');
          else if (role === 'admin' || role === 'manager') goto('/app');
          else if (role === 'ceo' || role === 'developer') goto('/protected');
          else goto('/customer');
        }, 800);
      } else if (result.type === 'failure' || result.data?.success === false) {
        errorMessage = result.data?.message || 'Login failed';
        showError = true;
        toast.error(errorMessage);
      } else if (result.type === 'error') {
        errorMessage = 'An unexpected error occurred';
        showError = true;
        toast.error(errorMessage);
      }

      loading = false;
      await update();
    };
  }

  // Clear errors when user starts typing
  function clearErrors() {
    if (showError) {
      showError = false;
      errorMessage = '';
    }
  }

    // Debug function to check CSRF token
    function debugCSRF() {
        console.log('CSRF Token:', $page.data.csrf);
        console.log('Form Data:', form);
        console.log('Form Element:', formEl);
    }
</script>

<!-- Main Auth Form -->
<section class="space-y-6">
  <form method="POST" use:enhance={handleFormEnhance} class="space-y-5" bind:this={formEl} on:submit={debugCSRF}>
    <!-- CSRF Token -->
    <input type="hidden" name="csrf" value={$page.data.csrf || ''} />

    <!-- Error Message Display -->
    {#if showError}
      <div class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
        {errorMessage}
      </div>
    {/if}

    <!-- Email Field -->
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
            id="email"
            name="email"
            type="email"
            placeholder="mail@example.com"
            bind:value={form.email}
            on:input={clearErrors}
            required
          />
    </div>

    <!-- Username (Register Only) -->
    {#if type === 'register'}
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input 
          id="username" 
          name="username"
          type="text" 
          bind:value={form.username} 
          on:input={clearErrors}
          required 
        />
      </div>
    {/if}

    <!-- Password -->
    <div class="space-y-2">
      <Label for="password">Password</Label>
      <Input
            id="password"
            name="password"
            type="password"
            bind:value={form.password}
            on:input={clearErrors}
            required
          />
    </div>

    <!-- Confirm Password -->
    {#if type === 'register'}
      <div class="space-y-2">
        <Label for="confirm-password">Re-type Password</Label>
        <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Re-type password"
              bind:value={form.confirmPassword}
              on:input={clearErrors}
              required
            />
      </div>

      {#if form.password !== form.confirmPassword}
        <p class="text-red-500 text-xs italic">Passwords do not match.</p>
      {/if}

    {/if}



    <!-- Submit Button -->
    <div class="space-y-2">
      <Button class="w-full mt-2" type="submit" disabled={loading}>
        {#if loading}
          <span class="animate-spin mr-2">⏳</span>
        {/if}
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
  
      <!-- Debug button -->
      <Button type="button" variant="outline" class="w-full" on:click={debugCSRF}>
        Debug CSRF
      </Button>
    </div>
  </form>

  <!-- Divider -->
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-background text-muted-foreground px-2">
        Or continue with
      </span>
    </div>
  </div>

  <!-- Social Logins -->
  <AuthOptions />
</section>