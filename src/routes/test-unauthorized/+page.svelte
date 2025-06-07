
<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">Test Unauthorized Access</h1>
  <div class="space-y-4">
    <p class="text-gray-600">Test the flash message system by clicking these links as different user roles:</p>
    
    <div class="space-y-2">
      <a href="/admin-only" class="block p-3 bg-red-100 text-red-700 rounded hover:bg-red-200">
        Try to access Admin-Only Page (should show flash message for non-admin users)
      </a>
      
      <a href="/app" class="block p-3 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
        Try to access App Dashboard (admin/manager only)
      </a>
      
      <a href="/staff" class="block p-3 bg-green-100 text-green-700 rounded hover:bg-green-200">
        Try to access Staff Area (staff only)
      </a>
    </div>
    
    <div class="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded">
      <h3 class="font-semibold">How to test:</h3>
      <ol class="list-decimal list-inside mt-2 space-y-1">
        <li>Login as a customer user</li>
        <li>Manually type one of the restricted URLs in the browser</li>
        <li>You should be redirected to /customer with a flash message</li>
        <li>The URL should be clean (no ?message= parameters)</li>
      </ol>
    </div>
  </div>
</div>
