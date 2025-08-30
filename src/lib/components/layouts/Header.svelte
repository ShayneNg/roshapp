<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
import Typography from '$lib/components/ux/Typography.svelte';
import Icon from '$lib/components/ux/Icon.svelte';
import { Search, Bell, Settings } from 'lucide-svelte';
export let title = 'Page title';
export let subtitle: string | undefined = undefined;
</script>

<header class="sticky top-0 z-40 h-16 bg-[var(--bg-header)] text-[var(--text-header)] border-b border-[var(--border-header)] px-4 md:px-6 flex items-center justify-between">
<div class="min-w-0">
    <Typography as="h1" variant="heading-3" weight="semibold" class="truncate">{title}</Typography>
    {#if subtitle}
    <Typography as="p" variant="caption" weight="normal" class="text-[var(--text-secondary)] truncate">{subtitle}</Typography>
    {/if}
</div>

<div class="flex items-center gap-2">
    <button class="inline-grid place-items-center w-12 h-12 rounded-md hover:bg-brand-50 dark:hover:bg-brand-900" aria-label="Search">
    <Icon as={Search} size="md" />
    </button>
    <button class="inline-grid place-items-center w-12 h-12 rounded-md hover:bg-brand-50 dark:hover:bg-brand-900" aria-label="Notifications">
    <Icon as={Bell} size="md" />
    </button>
    <button class="inline-grid place-items-center w-12 h-12 rounded-md hover:bg-brand-50 dark:hover:bg-brand-900" aria-label="Settings">
    <Icon as={Settings} size="md" />
    </button>
</div>
</header>
