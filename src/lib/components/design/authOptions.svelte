<script>
  import { Label } from "$lib/components/ui/label";

  import Icon from "$lib/components/icons/Icon.svelte";
</script>

<div class="grid grid-cols-3 gap-4">
  <Label
    for="card"
    class="border-muted bg-popover hover:bg-primary hover:text-primary-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      class="option-icon"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
    Card
  </Label>

  <Label
    for="bitcoin"
    class="border-muted bg-popover hover:bg-primary hover:text-primary-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer"
  >
    <Icon name="Bitcoin" class="option-icon" />
    Bitcoin
  </Label>

  <Label
    for="framer"
    class="border-muted bg-popover hover:bg-primary hover:text-primary-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer"
  >
    <Icon name="Slack" class="option-icon" />
    Slack
  </Label>

</div>
<style lang="scss">
.option {
  &-icon{
    @apply mb-3 h-6 w-6;
  }
}
</style>
