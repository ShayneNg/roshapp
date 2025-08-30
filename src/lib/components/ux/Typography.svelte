<!-- src/lib/components/ui/Typography.svelte -->
<script lang="ts">
    export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' = 'p';
    export let variant: 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'caption' = 'body';
    export let weight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';

    const variants = {
        'heading-1': 'text-3xl font-bold leading-tight',
        'heading-2': 'text-2xl font-semibold leading-tight',
        'heading-3': 'text-xl font-medium leading-tight',
        'body': 'text-base font-normal leading-normal',
        'caption': 'text-sm font-normal leading-normal'
    };
</script>

<svelte:element
    this={as}
    class="font-sans {variants[variant]} font-{weight} {$$props.class || ''}"
    {...$$restProps}
>
    <slot />
</svelte:element>
