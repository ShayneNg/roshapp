
<script>
  import { goto } from '$app/navigation';
  
  function testFlashMessage() {
    goto('/protected');
  }
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">Test Flash Message Flow</h1>
  <p class="mb-4">Click the button below to test the flash message flow from /protected → /forbidden → /customer</p>
  
  <button 
    on:click={testFlashMessage}
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Test Flash Message (Go to /protected)
  </button>
  
  <div class="mt-4 text-sm text-gray-600">
    <p>Expected flow:</p>
    <ol class="list-decimal list-inside ml-4">
      <li>/test-flash → /protected</li>
      <li>/protected → /forbidden (server redirect)</li>
      <li>/forbidden → /customer (with flash message cookie)</li>
      <li>/customer shows toast with "Access denied" message</li>
    </ol>
  </div>
</div>
