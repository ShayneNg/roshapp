
<script>
  import { toast } from 'svelte-sonner';
  
  function testError() {
    toast.error('This is an error toast');
  }
  
  function testSuccess() {
    toast.success('This is a success toast');
  }
  
  function testWarning() {
    toast.warning('This is a warning toast');
  }
  
  function testInfo() {
    toast.info('This is an info toast');
  }
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">Toast Test Page</h1>
  
  <div class="space-y-4">
    <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={testError}>
      Test Error Toast
    </button>
    
    <button class="px-4 py-2 bg-green-500 text-white rounded" on:click={testSuccess}>
      Test Success Toast
    </button>
    
    <button class="px-4 py-2 bg-yellow-500 text-white rounded" on:click={testWarning}>
      Test Warning Toast
    </button>
    
    <button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={testInfo}>
      Test Info Toast
    </button>
  </div>
</div>
