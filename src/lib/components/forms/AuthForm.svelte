
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
    confirmPassword: ''
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
    console.log('📝 REGISTER FLOW - Processing result:', result);
    
    if (result.type === 'success' || result.data?.success === true) {
      const message = result.data?.message || 'Registration successful!';
      toast.success(message);
      
      // Clear any errors
      showError = false;
      errorMessage = '';
      
      console.log('📝 REGISTER FLOW - Success! Redirecting to login in 2 seconds');
      
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
      console.log('📝 REGISTER FLOW - Error:', message);
    }
  }

  /**
   * LOGIN FLOW - Handle login response
   * Server handles redirect on success, so we only need to handle errors
   */
  function handleLoginFlow(result: any) {
    console.log('🔑 LOGIN FLOW - Processing result:', result);
    console.log('🔑 LOGIN FLOW - Result type:', result.type);
    console.log('🔑 LOGIN FLOW - Result data:', result.data);
    
    // Handle different result types
    if (result.type === 'redirect') {
      // This is success! Server is redirecting after successful login
      console.log('🔑 LOGIN FLOW - Login successful! Redirecting to:', result.location);
      toast.success('Login successful!');
      // Don't set any errors - let the redirect happen
      return;
    } else if (result.type === 'success') {
      // Unexpected success without redirect
      toast.success('Login successful!');
      console.log('🔑 LOGIN FLOW - Unexpected success response - server should have redirected');
    } else {
      // Handle login errors - check both result.data and nested error structures
      let errorMsg = 'Login failed';
      
      if (result.type === 'failure' && result.data?.message) {
        errorMsg = result.data.message;
      } else if (result.data?.message) {
        errorMsg = result.data.message;
      } else if (result.message) {
        errorMsg = result.message;
      }
      
      errorMessage = errorMsg;
      showError = true;
      toast.error(errorMsg);
      console.log('🔑 LOGIN FLOW - Error:', errorMsg);
    }
  }

  /**
   * Main form enhancement handler
   * Routes to appropriate flow based on form type
   */
  function handleFormEnhance() {
    return async ({ result, update }: { result: any; update: any }) => {
      loading = true;

      console.log(`🚀 FORM SUBMIT - ${type.toUpperCase()} flow starting`);
      console.log('🚀 FORM SUBMIT - Result type:', result.type);
      console.log('🚀 FORM SUBMIT - Result data:', result.data);

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
        console.log('❌ FORM SUBMIT - Server error occurred');
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
    console.log(`📤 FORM VALIDATION - ${type.toUpperCase()} form is valid, submitting...`);
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
