
<script lang="ts">
    import * as icons from 'lucide-svelte';
    
    let { name, size = 20, strokeWidth = 1.5, class: className = '', ...rest } = $props();

    const Icon = icons[name];
</script>
  
<Icon {size} stroke-width={strokeWidth} class={className} {...rest} />
  