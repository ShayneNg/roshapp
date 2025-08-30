<!-- src/lib/components/layout/Sidebar.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    import Typography from '$lib/components/ux/Typography.svelte';
    import Icon from '$lib/components/ux/Icon.svelte'; // your wrapper using lucide-svelte
    import { Home, FolderKanban, Users, BarChart3, Settings, PlugZap } from 'lucide-svelte';
    import { navItems } from '$lib/nav'; // [{ href, label, icon }]
    export let collapsed = false; // controlled by parent AppShell
    $: current = $page.url.pathname;
</script>

<aside class="fixed inset-y-0 left-0 bg-sidebar-bg border-r border-sidebar-border flex flex-col overflow-hidden transition-all duration-200 ease-out w-[280px] data-[collapsed=true]:w-16" data-collapsed={collapsed}>
    <!-- Brand -->
    <div class="h-16 flex items-center border-b border-sidebar-border relative">
    <div class="grid place-items-center w-16 shrink-0">
        <Icon as={Home} size="md" title="App" class="text-brand-400" />
    </div>
    <Typography as="span" variant="heading-3" weight="semibold" class="text-brand-400 whitespace-nowrap transition-all duration-200 ease-out data-[collapsed=true]:opacity-0 data-[collapsed=true]:-translate-x-8" data-collapsed={collapsed}>
        AppName
    </Typography>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto py-4">
    <ul class="space-y-1">
        {#each navItems as item, i}
        <li class="relative">
            <a href={item.href} aria-current={current === item.href ? 'page' : undefined}
            class="group relative flex items-center rounded-md h-12 hover:bg-brand-50 dark:hover:bg-brand-900 text-sidebar-text transition-colors px-0">
            <!-- Fixed icon cell -->
            <span class="grid place-items-center w-16 shrink-0">
                <Icon as={item.icon} size="md" title={item.label} class="{current === item.href ? 'text-brand-700 dark:text-brand-200' : 'text-sidebar-text'} group-hover:text-brand-600 dark:group-hover:text-brand-300" />
            </span>

            <!-- Sliding label -->
            <span class="flex-1 pr-3 transition-all duration-200 ease-out data-[collapsed=true]:-translate-x-12 data-[collapsed=true]:opacity-0 whitespace-nowrap"
                    style="transition-delay: {i * 20}ms" data-collapsed={collapsed}>
                <Typography as="span" variant="body" weight="medium">{item.label}</Typography>
            </span>

            <!-- Active indicator -->
            {#if current === item.href}
                <span class="absolute left-0 top-0 h-full w-1 bg-brand-400" />
            {/if}
            </a>
        </li>
        {/each}
    </ul>
    </nav>

    <!-- User (avatar only in collapsed) -->
    <div class="h-16 border-t border-sidebar-border grid place-items-center">
    <button class="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-brand-400 transition">
        <img src="/avatar.jpg" alt="User" class="w-full h-full object-cover" />
    </button>
    </div>
</aside>
