<!-- src/lib/components/layout/PageScaffold.svelte -->
<script lang="ts">
    export let title: string;
    export let subtitle: string = '';
    export let actions: Array<{
      label: string;
      variant?: 'primary' | 'outline';
      href?: string;
      action?: string;
      onClick?: () => void;
    }> = [];
  </script>
  
  <section class="py-6 px-4 md:px-8 space-y-6">
    <div>
      <slot name="breadcrumb" />
    </div>
  
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{title}</h1>
      {#if subtitle}
        <p class="text-muted-foreground mt-1">{subtitle}</p>
      {/if}
    </div>
  
    {#if actions.length}
      <div class="flex flex-wrap gap-2">
        {#each actions as action}
          {#if action.href}
            <a href={action.href} class={`btn btn-${action.variant ?? 'outline'}`}>
              {action.label}
            </a>
          {:else}
            <button
              class={`btn btn-${action.variant ?? 'outline'}`}
              on:click={action.onClick}
              data-action={action.action}
            >
              {action.label}
            </button>
          {/if}
        {/each}
      </div>
    {/if}
  
    <slot />
  </section>
  