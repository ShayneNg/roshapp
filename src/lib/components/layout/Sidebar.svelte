<script lang="ts">
  $: currentPath = $page.url.pathname;
  import { page } from '$app/stores';
  import Logo from '$lib/customUI/Logo.svelte';
  
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { sidebarMainNav, sidebarSettingsNav, sidebarUtilityNav } from './SidebarContent.js';

  const navGroups = [sidebarMainNav, sidebarSettingsNav, sidebarUtilityNav];

  const handleAction = (action: string) => {
    if (action === 'toggle-theme') {
      document.documentElement.classList.toggle('dark');
    } else if (action === 'logout') {
      console.log('Trigger logout');
    }
  };
</script>

<aside>
  <div class="flex justify-center items-center h-16">
      <Logo width="w-10" height="h-10"/>
  </div>

  <nav class="flex-1 flex flex-col items-center gap-2 mt-4">
    {#each navGroups as group, index}
      {#each group as item (item.label)}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {#if item.href}
              <a
                href={item.href}
                aria-label={item.label}
                class:active={item.href === currentPath}
                class="nav-icon"
              >
                <svelte:component this={item.icon} class="w-5 h-5" />
              </a>
            {:else if item.isAction}
              <Button
                aria-label={item.label}
                class="nav-icon"
                on:click={() => handleAction(item.action)}
              >
                <svelte:component this={item.icon} class="w-5 h-5" />
              </Button>
            {/if}
          </Tooltip.Trigger>
          <Tooltip.Content>{item.label}</Tooltip.Content>
        </Tooltip.Root>
      {/each}

      {#if index < navGroups.length - 1}
        <Separator class="w-10 my-6" />
      {/if}
    {/each}
  </nav>
</aside>

<style lang="scss">
  aside {
    @apply fixed inset-y-0 left-0 z-40 hidden md:flex w-16 flex-col bg-sidebar text-foreground border-r border-border;
  }

  .nav-icon {
    @apply w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-150 text-muted-foreground hover:bg-muted hover:text-foreground;
  }

  .active {
    @apply bg-primary text-primary-foreground;
  }

  .active:hover {
    @apply bg-primary text-primary-foreground cursor-default;
  }
</style>
