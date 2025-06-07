
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from 'svelte-sonner';
  import AuthOptions from '$lib/components/design/authOptions.svelte';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  // Props
  export let type: 'login' | 'register' = 'login';
  export let csrf: string;

  let loading = false;

  // Form data
  let form = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  };

  // Error handling
  let errorMessage = '';
  let showError = false;

  const dispatch = createEventDispatcher();
  let formEl: HTMLFormElement;

  /**
   * REGISTER FLOW - Clear and simple
   * 1. Submit registration data
   * 2. Show success toast
   * 3. Redirect to login page after delay
   */
  function handleRegisterFlow(result: any) {
    if (result.type === 'success' || result.data?.success === true) {
      const message = result.data?.message || 'Registration successful!';
      toast.success(message);
      
      // Clear any errors
      showError = false;
      errorMessage = '';
      
      // Redirect to login after toast is visible
      setTimeout(() => {
        goto('/auth/login', { replaceState: true });
      }, 2000);
      
    } else {
      // Handle registration errors
      const message = result.data?.message || 'Registration failed';
      errorMessage = message;
      showError = true;
      toast.error(message);
    }
  }

  /**
   * LOGIN FLOW - Handle login response with dynamic server data
   * Server returns success data with message and redirect route
   */
  function handleLoginFlow(result: any) {
    if (result.type === 'redirect') {
      // Server is handling the redirect - success!
      toast.success('Login successful!');
      showError = false;
      errorMessage = '';
      // Manually navigate to the redirect location
      window.location.href = result.location;
      
    } else if (result.type === 'success' && result.data?.success === true) {
      // Fallback: client-side redirect if server doesn't redirect
      const message = result.data.message || 'Login successful!';
      const redirectTo = result.data.redirectTo || '/customer';
      
      showError = false;
      errorMessage = '';
      toast.success(message);
      window.location.href = redirectTo;
      
    } else if (result.type === 'failure') {
      // Handle login errors with server message
      const errorMsg = result.data?.message || 'Login failed';
      errorMessage = errorMsg;
      showError = true;
      toast.error(errorMsg);
    } else {
      // Handle other error types
      const errorMsg = 'An unexpected error occurred during login';
      errorMessage = errorMsg;
      showError = true;
      toast.error(errorMsg);
    }
  }

  /**
   * Main form enhancement handler
   * Routes to appropriate flow based on form type
   */
  function handleFormEnhance() {
    return async ({ result, update }: { result: any; update: any }) => {
      loading = true;

      // Route to appropriate flow handler
      if (type === 'register') {
        handleRegisterFlow(result);
      } else if (type === 'login') {
        handleLoginFlow(result);
      }

      // Handle server errors (500, etc.)
      if (result.type === 'error') {
        errorMessage = 'An unexpected server error occurred';
        showError = true;
        toast.error(errorMessage);
      }

      loading = false;
      await update();
    };
  }

  /**
   * Clear errors when user starts typing
   */
  function clearErrors() {
    if (showError) {
      showError = false;
      errorMessage = '';
    }
  }

  // Form validation
  function validateForm() {
    if (type === 'register') {
      if (form.password !== form.confirmPassword) {
        errorMessage = 'Passwords do not match';
        showError = true;
        return false;
      }
    }
    return true;
  }
</script>

<!-- Enhanced Form with clear separation -->
<form 
  method="POST" 
  use:enhance={handleFormEnhance} 
  class="space-y-5" 
  bind:this={formEl}
  on:submit={() => {
    if (!validateForm()) {
      return false;
    }
  }}
>
  <!-- Security tokens -->
  <input type="hidden" name="csrf" value={csrf || ''} />
  <input type="hidden" name="type" value={type} />

  <!-- Error Display -->
  {#if showError}
    <div class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {errorMessage}
    </div>
  {/if}

  <!-- Email Field (Always Required) -->
  <div class="space-y-2">
    <Label for="email">Email</Label>
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="john.doe@example.com"
      bind:value={form.email}
      on:input={clearErrors}
      required
    />
  </div>

  <!-- Username Field (Register Only) -->
  {#if type === 'register'}
    <div class="space-y-2">
      <Label for="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder="@JDoe"
        bind:value={form.username}
        on:input={clearErrors}
        required
      />
    </div>
  {/if}

  <!-- Password Field (Always Required) -->
  <div class="space-y-2">
    <Label for="password">Password</Label>
    <Input
      id="password"
      name="password"
      type="password"
      placeholder="Enter your password"
      bind:value={form.password}
      on:input={clearErrors}
      required
    />
  </div>

  <!-- Remember Me (Login Only) -->
  {#if type === 'login'}
    <div class="flex items-center space-x-2">
      <input
        id="rememberMe"
        name="rememberMe"
        type="checkbox"
        bind:checked={form.rememberMe}
        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <Label for="rememberMe" class="text-sm font-normal">Remember me for 30 days</Label>
    </div>
  {/if}

  <!-- Confirm Password Field (Register Only) -->
  {#if type === 'register'}
    <div class="space-y-2">
      <Label for="confirm-password">Confirm Password</Label>
      <Input
        id="confirm-password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        bind:value={form.confirmPassword}
        on:input={clearErrors}
        required
      />
    </div>

    <!-- Password Match Validation -->
    {#if form.password && form.confirmPassword && form.password !== form.confirmPassword}
      <p class="text-red-500 text-xs italic">Passwords do not match.</p>
    {/if}
  {/if}

  <!-- Submit Button -->
  <div class="space-y-2">
    <Button class="w-full mt-2" type="submit" disabled={loading}>
      {#if loading}
        <span class="animate-spin mr-2">⏳</span>
        {type === 'login' ? 'Signing In...' : 'Creating Account...'}
      {:else}
        {type === 'login' ? 'Sign In' : 'Create Account'}
      {/if}
    </Button>

    <!-- Forgot Password Link (Login Only) -->
    {#if type === 'login'}
      <div class="text-center">
        <a 
          href="/auth/forgot-password" 
          class="text-sm text-blue-600 hover:text-blue-500 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
    {/if}
  </div>
</form>

<!-- Social Login Divider -->
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

<!-- Social Login Options -->
<AuthOptions />
