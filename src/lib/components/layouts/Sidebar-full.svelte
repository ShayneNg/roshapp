<script lang="ts">
    import { page } from '$app/stores';
    import { compactNavigation as navItems } from '$lib/nav-compact';
    import Icon from '$lib/components/Icon.svelte'; // your icon wrapper
  
    $: current = $page.url.pathname;
    $: primary = navItems.filter(n => n.section === 'primary');
    $: secondary = navItems.filter(n => n.section === 'secondary');
</script>
  
<aside 
  class="fixed inset-y-0 left-0 w-[280px] bg-sidebar-bg border-r border-sidebar-border flex flex-col"
  role="navigation">

  <!-- Brand -->
  <div class="h-[64px] flex items-center px-md border-b border-sidebar-border">
    <img src="/logo.svg" alt="Logo" class="w-8 h-8 mr-sm" />
    <span class="text-brand-400 font-semibold text-[18px]">AppName</span>
  </div>
</aside>

</aside>  
  <aside
    class="fixed inset-y-0 left-0 w-[280px] bg-sidebar-bg border-r border-sidebar-border flex flex-col"
    role="navigation"
  >
    <!-- Brand -->
    <div class="h-[64px] flex items-center px-md border-b border-sidebar-border">
      <img src="/logo.svg" alt="Logo" class="w-8 h-8 mr-sm" />
      <span class="text-brand-400 font-semibold text-[18px]">AppName</span>
    </div>
  
    <!-- Primary nav -->
    <nav class="flex-1 overflow-y-auto py-md">
      <ul class="space-y-xs">
        {#each primary as item}
          <li>
            <a
              href={item.href}
              aria-current={current === item.href ? 'page' : undefined}
              class="group flex items-center h-12 px-md rounded-lg text-sidebar-text
                     hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900
                     relative transition"
              class:bg-brand-100={current === item.href}
              class:text-brand-800={current === item.href}
            >
              <Icon name={item.icon} class="w-5 h-5 mr-sm shrink-0
                    group-hover:text-brand-600 dark:group-hover:text-brand-300
                    {current === item.href ? 'text-brand-700 dark:text-brand-200' : ''}" />
              <span class="text-[14px] leading-[1.4]">{item.tooltip}</span>
  
              <!-- active indicator -->
              <span
                class="absolute left-0 top-0 h-full w-1 rounded-r
                      bg-brand-400 opacity-0 group-hover:opacity-100 transition"
                class:opacity-100={current === item.href}
              />
            </a>
          </li>
        {/each}
      </ul>
  
      <!-- divider -->
      <hr class="my-lg border-sidebar-border opacity-60" />
  
      <!-- Secondary nav -->
      <ul class="space-y-xs">
        {#each secondary as item}
          <li>
            <a
              href={item.href}
              class="group flex items-center h-12 px-md rounded-lg text-sidebar-text
                     hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900
                     relative transition"
              aria-current={current === item.href ? 'page' : undefined}
            >
              <Icon name={item.icon} class="w-5 h-5 mr-sm shrink-0
                    group-hover:text-brand-600 dark:group-hover:text-brand-300" />
              <span class="text-[14px] leading-[1.4]">{item.tooltip}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  
    <!-- User -->
    <button
      class="h-[80px] w-full flex items-center px-md border-t border-sidebar-border
             hover:bg-brand-50 dark:hover:bg-brand-900 transition"
    >
      <img src="/avatar.jpg" alt="User" class="w-10 h-10 rounded-full mr-sm object-cover" />
      <div class="truncate">
        <span class="block text-[14px] font-medium text-sidebar-text truncate">John Doe</span>
        <span class="block text-[12px] text-slate-500 truncate">john@company.com</span>
      </div>
      <Icon name="chevron-down" class="ml-auto w-4 h-4 text-slate-400" />
    </button>
  </aside>
  