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
  export let type: 'login' | 'register';

  // Form validation schema using Zod
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    username: z.string().min(3).max(20).optional(),
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

  // Handles form submission
  async function handleSubmit() {
    loading = true;

    // Client-side schema validation
    const validation = schema.safeParse(form);
    if (!validation.success) {
      toast.error('Please check your form input');
      loading = false;
      return;
    }

    try {
      // Prepare request
      const url = `/api/auth/${type}`;
      const payload = {
        email: form.email,
        password: form.password,
        ...(type === 'register' && { username: form.username })
      };

      // Perform server request
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      // Handle success or failure
      if (res.ok) {
        toast.success(result.message || `${type} successful`);
        dispatch('success');
        goto('/app'); // redirect to dashboard or protected area
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Auth error:', err);
      toast.error('Server error. Please try again.');
    } finally {
      loading = false;
    }
  }
</script>

<!-- Main Auth Form -->
<section class="space-y-6">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <!-- Email Field -->
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input id="email" type="email" bind:value={form.email} required />
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
      <Input id="password" type="password" bind:value={form.password} required />
    </div>

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