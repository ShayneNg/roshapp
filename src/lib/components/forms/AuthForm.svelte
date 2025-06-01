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
    password: ''
  };

  // Loading state for submit button
  let loading = false;

  // Event dispatcher for parent communication
  const dispatch = createEventDispatcher();

  let formEl: HTMLFormElement;

  function handleFormEnhance({ result }: { result: any }) {
    result.then((res: any) => {
      if (!res?.type) {
        if (res?.data?.success === false) {
          toast.error(res.data.message || 'Login failed');
        } else if (res?.data?.success === true) {
          toast.success(res.data.message || 'Welcome back!');

          // Delay a bit before navigating
          const role = res.data.role;
          setTimeout(() => {
            if (role === 'staff') goto('/staff');
            else if (role === 'admin' || role === 'manager') goto('/app');
            else if (role === 'ceo' || role === 'developer') goto('/protected');
            else goto('/customer');
          }, 800);
        }
      }
    });
  }
</script>

<!-- Main Auth Form -->
<section class="space-y-6">
  <form bind:this={formEl} method="POST" use:enhance={handleFormEnhance} class="space-y-5">
    <!-- Email Field -->
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
            id="email"
            name="email"
            type="email"
            placeholder="mail@example.com"
            bind:value={form.email}
            required
          />
    </div>

    <!-- Username (Register Only) -->
    {#if type === 'register'}
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input id="username" type="text" bind:value={form.username} required />
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
            required
          />
    </div>
    
    <!-- Confirm Password -->
    {#if type === 'register'}
      <div class="space-y-2">
        <Label for="confirm-password">Re-type Password</Label>
        <Input
              id="confirm-password"
              type="password"
              placeholder="Re-type password"
              bind:value={form.confirmPassword}
              required
            />
      </div>
    {/if}
    
    {#if form.password !== form.confirmPassword}
      <p class="text-red-500 text-xs italic">Passwords do not match.</p>
    {/if}

    <!-- Submit Button -->
    <Button class="w-full" type="submit" disabled={loading}>
      {#if loading}
        <span class="animate-spin mr-2">⏳</span>
      {/if}
      {type === 'login' ? 'Login' : 'Register'}
    </Button>
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