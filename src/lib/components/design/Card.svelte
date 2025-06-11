
<script lang="ts">
  interface Props {
    width?: string;
    height?: string;
    title?: string;
    subtitle?: string;
    children: any;
  }
  
  let { width = "w-full", height = "h-auto", title, subtitle, children }: Props = $props();
</script>

<div class="card {width} {height} bg-card text-card-foreground border border-border rounded-lg overflow-hidden">
  {#if title || subtitle}
    <div class="card-header p-4 border-b border-border">
      {#if title}
        <h3 class="text-lg font-semibold">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="text-sm text-muted-foreground mt-1">{subtitle}</p>
      {/if}
    </div>
  {/if}
  
  <div class="card-content p-4">
    {@render children()}
  </div>
</div>

<style lang="scss">
.card {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
}
</style>
