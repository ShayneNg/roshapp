
<script lang="ts">
    import * as LucideIcons from 'lucide-svelte';
  
    export let name: keyof typeof LucideIcons;
    export let size: number = 20;
    export let strokeWidth: number = 1.5;
    export let className = "";
    export let ariaLabel = name;
  
    const IconComponent = LucideIcons[name];
  </script>
  
  <svelte:component
    this={IconComponent}
    size={size}
    strokeWidth={strokeWidth}
    class={"text-muted-foreground " + className}
    aria-label={ariaLabel}
  />
  