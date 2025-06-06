<!-- src/routes/app/+layout.svelte -->
<script lang="ts">
  import { spacing } from "$lib/config/spacing";
  import RoleLayout from '$lib/components/layout/RoleLayout.svelte';
  import { onMount } from 'svelte';
  import { getFlashMessage } from '$lib/utils/flashMessage';
  import { toast } from 'svelte-sonner';

  onMount(() => {
    const flashMessage = getFlashMessage();
    if (flashMessage) {
      if (flashMessage.type === 'error') {
        toast.error(flashMessage.message);
      } else if (flashMessage.type === 'success') {
        toast.success(flashMessage.message);
      } else if (flashMessage.type === 'warning') {
        toast.warning(flashMessage.message);
      } else {
        toast.info(flashMessage.message);
      }
    }
  });
</script>
<script lang="ts">
    import Header from '$lib/components/layout/Header.svelte';
    import Sidebar from '$lib/components/layout/Sidebar.svelte';
    import PageScaffold from '$lib/components/layout/PageScaffold.svelte';
    export let data;
</script>
<div class="min-h-screen flex bg-background text-foreground">
    <aside class="w-16 border-r border-muted flex flex-col">
        <Sidebar />
    </aside>

    <div class="flex-1 flex flex-col">
        <Header />
        <PageScaffold title={data.title} subtitle={data.subtitle} actions={data.actions}>
            <slot />
        </PageScaffold>
    </div>
</div>