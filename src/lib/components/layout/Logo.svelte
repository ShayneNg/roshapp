<script lang="ts">
  import { page } from '$app/stores';
  import logo from '/static/logo_1415.svg';
  export let width = "w-20";
  export let height = "h-20";

  // Determine the href based on the current URL
  let href = '/app';  // default href
  if (page?.url) {
    const currentPath = page.url.pathname;
    const pathSegments = currentPath.split('/');
    if (pathSegments.length > 2) {
      href = '/' + pathSegments[pathSegments.length - 2];
    }
  }
</script>
<a href={href} class="flex items-center justify-center">
  <img src={logo} alt="Roshapp" class={`${width} ${height} aspect-ratio object-contain`} />
</a>