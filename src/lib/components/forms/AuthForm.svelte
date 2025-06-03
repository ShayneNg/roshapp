<script lang="ts">
  // Emits custom events (not used here, but good practice for form components)
  import { createEventDispatcher } from 'svelte';

  // Zod schema for client-side validation (optional but clean)
  import { z } from 'zod';

  // UI components (ShadCN-style)
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  // Toast notification system
  import { toast } from 'svelte-sonner';

  // Social login buttons (e.g. Google, GitHub)
  import AuthOptions from '$lib/components/design/authOptions.svelte';

  // Used for programmatic navigation
  import { goto } from '$app/navigation';

  // Enables progressive form enhancement (SvelteKit magic)
  import { enhance } from '$app/forms';

  // For access to URL parameters or SSR values
  import { page } from '$app/stores';

  // Props passed from the page
  export let type: 'login' | 'register' = 'login';
  export let csrf: string; // passed from `+page.server.ts`

  let loading = false; // disables submit button and shows spinner

  // Form validation schema (used optionally here)
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password too short' })
  });

  // Form data structure
  let form = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  // Error display logic
  let errorMessage = '';
  let showError = false;

  // Useful if you want to emit 'success' or 'fail' to a parent
  const dispatch = createEventDispatcher();

  // Optional reference to the form element itself
  let formEl: HTMLFormElement;

  /**
   * Handles enhanced form submission via SvelteKit's use:enhance
   */
  function handleFormEnhance() {
    return async ({ result, update }: { result: any; update: any }) => {
      console.log('🔍 FORM DEBUG - Form submission result:', result);
      console.log('🔍 FORM DEBUG - CSRF token being sent:', csrf);
      loading = true;

      // SUCCESS → Redirect based on role
      if (result.type === 'success' && result.data?.success === true) {
        showError = false;
        errorMessage = '';
        toast.success(result.data.message || 'Welcome back!');

        const role = result.data.role;
        setTimeout(() => {
          if (role === 'staff') goto('/staff');
          else if (role === 'admin' || role === 'manager') goto('/app');
          else if (role === 'ceo' || role === 'developer') goto('/protected');
          else goto('/customer'); // fallback if no role set
        }, 800);

      // VALIDATION FAILURE (from +page.server.ts)
      } else if (result.type === 'failure' || result.data?.success === false) {
        errorMessage = result.data?.message || 'Login failed';
        showError = true;
        toast.error(errorMessage);

      // SERVER ERROR
      } else if (result.type === 'error') {
        errorMessage = 'An unexpected error occurred';
        showError = true;
        toast.error(errorMessage);
      }

      loading = false;
      await update(); // refresh form state
    };
  }

  /**
   * Clear errors when user types again
   */
  function clearErrors() {
    if (showError) {
      showError = false;
      errorMessage = '';
    }
  }
</script>

<!-- CSRF protection & enhanced form submission -->
<form method="POST" use:enhance={handleFormEnhance} class="space-y-5" bind:this={formEl}>
  <!-- Secure CSRF token from server -->
  <input type="hidden" name="csrf" value={csrf || ''} />

  <!-- Error message block -->
  {#if showError}
    <div class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {errorMessage}
    </div>
  {/if}

  <!-- Always required: Email -->
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

  <!-- Only for register: Username -->
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
        required={type === 'register'}
      />
    </div>
  {/if}

  <!-- Always required: Password -->
  <div class="space-y-2">
    <Label for="password">Password</Label>
    <Input
      id="password"
      name="password"
      type="password"
      placeholder="password"
      bind:value={form.password}
      on:input={clearErrors}
      required
    />
  </div>

  <!-- Only for register: Confirm Password -->
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
        required={type === 'register'}
      />
    </div>

    {#if form.password && form.confirmPassword && form.password !== form.confirmPassword}
      <p class="text-red-500 text-xs italic">Passwords do not match.</p>
    {/if}
  {/if}


  <!-- Submit button -->
  <div class="space-y-2">
    <Button class="w-full mt-2" type="submit" disabled={loading}>
      {#if loading}
        <span class="animate-spin mr-2">⏳</span>
      {/if}
      {type === 'login' ? 'Login' : 'Register'}
    </Button>
  </div>
</form>

<!-- Divider for social login -->
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

<!-- Social login options (e.g. Google, GitHub) -->
<AuthOptions />

