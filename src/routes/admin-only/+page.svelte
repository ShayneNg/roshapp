
<script>
  export let data;
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">Admin Only Page</h1>
  <p class="text-gray-600">{data.message}</p>
  <p class="mt-4 text-sm text-gray-500">
    This page should only be accessible to admin/manager roles.
    Customer users should be redirected with a flash message.
  </p>
</div>
