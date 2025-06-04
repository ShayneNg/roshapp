<script>
  import * as Card from "$lib/components/ui/card";
</script>

<div class="customer-container">
  <div class="customer-container-column">
    
  </div>
</div>

<style lang="scss" scoped>
.customer-container {
  @apply hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3;
}

.customer-container-column {
  @apply col-span-2 grid items-start gap-6 lg:col-span-1;
}
</style>