<script lang="ts">
    import { page } from '$app/stores';
    import { compactNavigation } from '$lib/navigation-compact';
    import Icon from '$lib/components/Icon.svelte';
    import Tooltip from '$lib/components/Tooltip.svelte';
  
    $: current = $page.url.pathname;
    $: primary = compactNavigation.filter(n => n.section === 'primary');
    $: secondary = compactNavigation.filter(n => n.section === 'secondary');  
    $: tertiary = compactNavigation.filter(n => n.section === 'tertiary');
  </script>
  
  <aside 
    class="fixed inset-y-0 left-0 w-16 bg-sidebar-bg border-r border-sidebar-border flex flex-col z-50"
    role="navigation"
    aria-label="Compact navigation"
  >
    <!-- Brand Icon Only -->
    <div class="h-16 flex items-center justify-center border-b border-sidebar-border">
      <Tooltip text="AppName" position="right">
        <button class="w-8 h-8 rounded-lg bg-brand-400 flex items-center justify-center">
          <Icon name="logo" class="w-5 h-5 text-white" />
        </button>
      </Tooltip>
    </div>
  
    <!-- Primary Navigation Icons -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-1">
        {#each primary as item}
          <li class="relative">
            <Tooltip text={item.tooltip} position="right">
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                aria-current={current === item.href ? 'page' : undefined}
                class="group relative flex items-center justify-center w-12 h-12 mx-auto rounded-lg
                       text-sidebar-text hover:bg-brand-50 hover:text-brand-700 
                       dark:hover:bg-brand-900 dark:hover:text-brand-200
                       transition-all duration-200"
                class:bg-brand-100={current === item.href}
                class:text-brand-800={current === item.href}
                class:dark:bg-brand-800={current === item.href}
                class:dark:text-brand-100={current === item.href}
              >
                <Icon 
                  name={item.icon} 
                  class="w-5 h-5 transition-colors
                         group-hover:text-brand-600 dark:group-hover:text-brand-300"
                  class:text-brand-700={current === item.href}
                  class:dark:text-brand-200={current === item.href}
                />
                
                <!-- Active indicator dot -->
                {#if current === item.href}
                  <span class="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-400 rounded-r"></span>
                {/if}
                
                <!-- Badge indicator -->
                {#if item.badge}
                  <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent-400 
                             text-white text-[10px] font-medium rounded-full 
                             flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                {/if}
              </a>
            </Tooltip>
          </li>
        {/each}
      </ul>
  
      <!-- Section divider -->
      <hr class="my-4 mx-3 border-sidebar-border opacity-60" />
  
      <!-- Secondary Navigation -->
      <ul class="space-y-1">
        {#each secondary as item}
          <li>
            <Tooltip text={item.tooltip} position="right">
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                class="group relative flex items-center justify-center w-12 h-12 mx-auto rounded-lg
                       text-sidebar-text hover:bg-brand-50 hover:text-brand-700 
                       dark:hover:bg-brand-900 dark:hover:text-brand-200
                       transition-all duration-200"
              >
                <Icon name={item.icon} class="w-5 h-5" />
                
                {#if item.badge}
                  <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent-400 
                             text-white text-[10px] font-medium rounded-full 
                             flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                {/if}
              </a>
            </Tooltip>
          </li>
        {/each}
      </ul>
  
      <!-- Another divider -->
      <hr class="my-4 mx-3 border-sidebar-border opacity-40" />
  
      <!-- Tertiary Navigation -->
      <ul class="space-y-1">
        {#each tertiary as item}
          <li>
            <Tooltip text={item.tooltip} position="right">
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                class="group flex items-center justify-center w-12 h-12 mx-auto rounded-lg
                       text-sidebar-text hover:bg-brand-50 hover:text-brand-700 
                       dark:hover:bg-brand-900 dark:hover:text-brand-200
                       transition-all duration-200"
              >
                <Icon name={item.icon} class="w-5 h-5 opacity-75 group-hover:opacity-100" />
                
                {#if item.badge}
                  <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-info-400 
                             text-white text-[10px] font-medium rounded-full 
                             flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                {/if}
              </a>
            </Tooltip>
          </li>
        {/each}
      </ul>
    </nav>
  
    <!-- User Avatar Only -->
    <div class="h-16 flex items-center justify-center border-t border-sidebar-border">
      <Tooltip text="John Doe • Settings" position="right">
        <button 
          class="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-brand-400 
                 transition-all duration-200"
          aria-label="User menu - John Doe"
        >
          <img src="/avatar.jpg" alt="User avatar" class="w-full h-full object-cover" />
        </button>
      </Tooltip>
    </div>
  </aside>
  