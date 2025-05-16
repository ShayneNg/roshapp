<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { House } from "lucide-svelte";

  // Import the Svelte store or another way to access the current URL
  import { page } from '$app/stores';
  $: currentUrl = $page.url.pathname;
</script>

<Breadcrumb.Root class="font-medium text-muted-foreground text-muted-foreground">
   <Breadcrumb.List>
      <Breadcrumb.Item>
          <Breadcrumb.Page>
              <House class="h-4 w-4" />
          </Breadcrumb.Page>
      </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
       <Breadcrumb.Link asChild let:attrs>
          <a href={`/${currentUrl.split('/').slice(-2, -1)[0]}`} {...attrs}>{currentUrl.split('/').slice(-2, -1)[0]}</a>
       </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
       <Breadcrumb.Page>
          {currentUrl.split('/').pop() || 'Home'}
       </Breadcrumb.Page>
    </Breadcrumb.Item>
   </Breadcrumb.List>
</Breadcrumb.Root>

<style lang="scss" scoped>
   a {
      @apply cursor-pointer;
   }
</style>