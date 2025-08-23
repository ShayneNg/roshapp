<script>
    import * as icons from '@lucide/svelte';
    let { name, ...props } = $props();

    const Icon = icons[name];
</script>

<Icon {...props} />