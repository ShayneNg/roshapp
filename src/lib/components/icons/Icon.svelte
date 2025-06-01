
<script lang="ts">
    import * as icons from '@lucide/svelte';
    let { name, size = 20, strokeWidth = 1.5, className, ariaLabel } = $props();

    const Icon = icons[name];
</script>
  
<Icon {...props} />
  