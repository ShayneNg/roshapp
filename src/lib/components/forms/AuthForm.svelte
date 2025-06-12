
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

  // Error handling with consistent UI
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

<!-- Enhanced Form with consistent layout -->
<div class="auth-form-container w-full max-w-md mx-auto">
  <form 
    method="POST" 
    use:enhance={handleFormEnhance} 
    class="space-y-4" 
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

    <!-- Permanent Error Display Area - Always reserves space -->
    <div class="error-container min-h-[48px] flex items-center justify-center">
      {#if showError}
        <div class="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md transition-all duration-200 ease-in-out">
          {errorMessage}
        </div>
      {/if}
    </div>

    <!-- Form Fields Container -->
    <div class="form-fields space-y-4">
      <!-- Email Field (Always Required) -->
      <div class="field-group">
        <Label for="email" class="text-sm font-medium text-foreground mb-2 block">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          bind:value={form.email}
          on:input={clearErrors}
          class="w-full h-11 px-3 py-2 text-base md:text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          autocomplete="email"
          autocapitalize="none"
          autocorrect="off"
          spellcheck="false"
          required
        />
      </div>

      <!-- Username Field (Register Only) -->
      {#if type === 'register'}
        <div class="field-group">
          <Label for="username" class="text-sm font-medium text-foreground mb-2 block">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="@JDoe"
            bind:value={form.username}
            on:input={clearErrors}
            class="w-full h-11 px-3 py-2 text-base md:text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            autocomplete="username"
            autocapitalize="none"
            autocorrect="off"
            spellcheck="false"
            required
          />
        </div>
      {/if}

      <!-- Password Field (Always Required) -->
      <div class="field-group">
        <Label for="password" class="text-sm font-medium text-foreground mb-2 block">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          bind:value={form.password}
          on:input={clearErrors}
          class="w-full h-11 px-3 py-2 text-base md:text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          autocomplete={type === 'login' ? 'current-password' : 'new-password'}
          required
        />
      </div>

      <!-- Confirm Password Field (Register Only) -->
      {#if type === 'register'}
        <div class="field-group">
          <Label for="confirm-password" class="text-sm font-medium text-foreground mb-2 block">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            bind:value={form.confirmPassword}
            on:input={clearErrors}
            class="w-full h-11 px-3 py-2 text-base md:text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            autocomplete="new-password"
            required
          />
          
          <!-- Inline password validation for register -->
          {#if form.password && form.confirmPassword && form.password !== form.confirmPassword}
            <p class="text-red-500 text-xs mt-1 ml-1">Passwords do not match</p>
          {/if}
        </div>
      {/if}

      <!-- Remember Me Checkbox (Login Only) -->
      {#if type === 'login'}
        <div class="field-group flex items-center space-x-3 py-2">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            bind:checked={form.rememberMe}
            class="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-2"
          />
          <Label for="rememberMe" class="text-sm font-normal text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="action-section space-y-3 pt-2">
      <Button 
        class="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none" 
        type="submit" 
        disabled={loading}
      >
        {#if loading}
          <span class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {type === 'login' ? 'Signing In...' : 'Creating Account...'}
          </span>
        {:else}
          {type === 'login' ? 'Sign In' : 'Create Account'}
        {/if}
      </Button>

      {#if type === 'login'}
        <div class="text-center">
          <a 
            href="/auth/forgot-password" 
            class="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      {/if}
    </div>
  </form>

  <!-- Social Login Divider -->
  <div class="relative my-6">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t border-border"></span>
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-background text-muted-foreground px-3 font-medium">
        Or continue with
      </span>
    </div>
  </div>

  <!-- Social Login Options -->
  <AuthOptions />
</div>

<style lang="scss">
.auth-form-container {
  // Prevent mobile zoom and layout shifts
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  
  // Mobile-specific fixes
  @media (max-width: 768px) {
    // Prevent zoom on input focus (iOS Safari)
    input, select, textarea {
      font-size: 16px !important;
      -webkit-appearance: none;
      -webkit-border-radius: 0;
      border-radius: 0.375rem;
      
      // Prevent zoom behavior
      &:focus {
        zoom: 1;
        -webkit-user-select: auto;
        user-select: auto;
      }
    }
    
    // Prevent touch callouts and selection
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    
    // Prevent bounce scrolling
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
  
  // Ensure consistent form layout
  .error-container {
    // Always maintains space for errors to prevent layout shift
    transition: all 0.2s ease-in-out;
    width: 100%;
  }
  
  .field-group {
    // Consistent field spacing
    position: relative;
    width: 100%;
    
    // Focus states for better UX
    &:focus-within {
      label {
        color: hsl(var(--primary));
      }
    }
  }
  
  .action-section {
    // Separates form actions visually
    border-top: 1px solid hsl(var(--border));
    padding-top: 1rem;
    margin-top: 1.5rem;
    width: 100%;
  }
}

// Loading state improvements
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Smooth transitions for better UX
input, button {
  transition: all 0.2s ease-in-out;
}

// Focus improvements
input:focus {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
}

// Consistent button states
button:disabled {
  cursor: not-allowed;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px hsl(var(--primary) / 0.1);
}
</style>
