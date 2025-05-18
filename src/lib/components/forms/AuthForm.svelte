<!-- src/lib/components/forms/AuthForm.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Toaster } from '$lib/components/ui/sonner';
  import { goto } from '$app/navigation';

  export let type: 'login' | 'register';

  const dispatch = createEventDispatcher();

  const schema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(20).optional(),
    password: z.string().min(6),
  });

  let form = {
    email: '',
    username: '',
    password: '',
  };

  let loading = false;

  async function onSubmit() {
    loading = true;
    try {
      const url = `/api/auth/${type}`;
      const payload = {
        email: form.email,
        password: form.password,
        ...(type === 'register' && { username: form.username })
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      // if (res.ok) {
      //   toast.success(result.message || `${type} successful`);
      //   dispatch('success');
      //   goto('/'); // or your dashboard route
      // } else {
      //   toast.error(result.error || 'Something went wrong');
      // }
    } catch (err) {
      // toast.error('Server error');
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={onSubmit} class="space-y-6">
  <div class="space-y-2">
    <Label for="email">Email</Label>
    <Input id="email" type="email" bind:value={form.email} required />
  </div>

  {#if type === 'register'}
    <div class="space-y-2">
      <Label for="username">Username</Label>
      <Input id="username" type="text" bind:value={form.username} required />
    </div>
  {/if}

  <div class="space-y-2">
    <Label for="password">Password</Label>
    <Input id="password" type="password" bind:value={form.password} required />
  </div>

  <Button class="w-full" type="submit" disabled={loading}>
    {#if loading}
      <span class="animate-spin mr-2">⏳</span>
    {/if}
    {type === 'login' ? 'Login' : 'Register'}
  </Button>
</form>
