<!-- src/routes/auth/+layout.svelte -->
<script lang="ts">
  import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";
  import Logo from '$lib/components/layout/Logo.svelte';
  const  bgImage = '/images/auth-visual_003.jpg';

</script>

<div class="auth-layout">
  <!-- Left: Image -->
  <div class="hidden md:block w-1/2 bg-cover bg-center" style="background-image: url({bgImage});">
    <!-- If using local asset, make sure it's placed in static/images/ -->
  </div>

  <!-- Right: Form Slot -->
  <div class="auth-layout_content">
    <div class="absolute top-4 right-4">
      <LightSwitch />
    </div>
    <Logo />
    <div class="max-w-md w-full space-y-6">
      <slot />
    </div>
  </div>
</div>
<style lang="scss">
.auth-layout{
  @apply flex h-screen w-screen overflow-hidden;

  &_content {
    @apply w-full md:w-1/2 md:space-y-8 flex flex-col items-center justify-center p-6 md:p-12 bg-background relative;
  }
}  
</style>