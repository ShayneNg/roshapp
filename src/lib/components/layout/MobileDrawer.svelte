<script lang="ts">
  import { page } from '$app/stores';
  
  import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
  import { Button } from '$lib/components/ui/button';
  import { Menu } from 'lucide-svelte';
  import { sidebarMainNav, sidebarSettingsNav, sidebarUtilityNav } from './SidebarContent.js';

  let open = false;
  $: currentPath = $page.url.pathname;
  const navGroups = [sidebarMainNav, sidebarSettingsNav, sidebarUtilityNav];

  const handleAction = (action: string) => {
    if (action === 'toggle-theme') {
      document.documentElement.classList.toggle('dark');
    } else if (action === 'logout') {
      console.log('Trigger logout');
    }
    open = false;
  };
</script>

<Sheet bind:open>
  <SheetTrigger asChild>
    <Button size="icon" variant="ghost" class="md:hidden">
      <Menu class="w-5 h-5" />
    </Button>
  </SheetTrigger>

  <SheetContent side="left" class="w-64 p-4 bg-background text-foreground border-r border-border">
    <div class="font-bold text-lg mb-6">MyApp</div>

    {#each navGroups as group, index}
      <div class="flex flex-col gap-1">
        {#each group as item (item.label)}
          {#if item.href}
            <a
              href={item.href}
              on:click={() => (open = false)}
              class={`nav-link ${item.href === currentPath ? 'active' : ''}`}

            >
              <svelte:component this={item.icon} class="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          {:else if item.isAction}
            <Button
              class="nav-link"
              on:click={() => handleAction(item.action)}
            >
              <svelte:component this={item.icon} class="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          {/if}
        {/each}
      </div>

      {#if index < navGroups.length - 1}
        <div class="my-4 border-t border-border" />
      {/if}
    {/each}
  </SheetContent>
</Sheet>

<style>
  .nav-link {
    @apply w-full flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150;
  }

  .active {
    @apply bg-primary text-primary-foreground;
  }

  .active:hover {
    @apply bg-primary text-primary-foreground;
  }
</style>
