<!-- src/lib/components/ui/Icon.svelte -->
<script lang="ts">
    import type { ComponentType } from 'svelte';
    export let as: ComponentType;
    export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md'; // 20, 24, 36, 48
    export let title: string | undefined = undefined;
    export let stroke = 2;
    const px = { sm: 20, md: 24, lg: 36, xl: 48 }[size];
</script>

<svelte:component this={as} size={px} stroke-width={stroke}
    aria-hidden={title ? undefined : true} aria-label={title} class="shrink-0" />
