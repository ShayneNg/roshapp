<script>
  import { Button, Card } from "$lib/components/ui";
</script>

<Card class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">My Weekly Schedule</h2>
    <Button size="sm">Edit Availability</Button>
  </div>

  <div class="grid grid-cols-7 gap-2 text-sm">
    <div class="bg-gray-100 p-2 rounded">MON: 9am - 5pm</div>
    <div class="bg-gray-100 p-2 rounded">TUE: 9am - 5pm</div>
    <div class="bg-gray-100 p-2 rounded">WED: 9am - 5pm</div>
    <div class="bg-gray-100 p-2 rounded">THU: 9am - 8pm</div>
    <div class="bg-gray-100 p-2 rounded">FRI: 9am - 5pm</div>
    <div class="bg-gray-50 text-gray-400 p-2 rounded">SAT: Unavailable</div>
    <div class="bg-gray-50 text-gray-400 p-2 rounded">SUN: Unavailable</div>
  </div>
</Card>
