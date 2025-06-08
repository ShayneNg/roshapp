
<script>
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { TestTube, AlertCircle, MessageSquare, Shield, Bell } from 'lucide-svelte';

  // Flash message test
  function testFlashMessage() {
    goto('/protected');
  }

  // Toast tests
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

<div class="min-h-screen bg-gray-50 p-6">
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="text-center">
      <div class="flex items-center justify-center gap-2 mb-4">
        <TestTube class="h-8 w-8 text-blue-600" />
        <h1 class="text-3xl font-bold text-gray-900">Test Dashboard</h1>
      </div>
      <p class="text-gray-600">Comprehensive testing suite for authentication, authorization, and UI components</p>
    </div>

    <!-- Test Categories Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Flash Message Tests -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MessageSquare class="h-5 w-5 text-orange-600" />
            Flash Message System
          </CardTitle>
          <CardDescription>Test flash message flow and cookie-based messaging</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 class="font-medium text-blue-800 mb-2">Test Flow</h4>
            <ol class="list-decimal list-inside text-sm text-blue-700 space-y-1">
              <li>/test → /protected</li>
              <li>/protected → /forbidden (server redirect)</li>
              <li>/forbidden → /customer (with flash message cookie)</li>
              <li>/customer shows toast with "Access denied" message</li>
            </ol>
          </div>
          
          <Button 
            on:click={testFlashMessage}
            class="w-full bg-orange-500 hover:bg-orange-600"
          >
            Test Flash Message Flow
          </Button>
        </CardContent>
      </Card>

      <!-- Toast Tests -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Bell class="h-5 w-5 text-green-600" />
            Toast Notifications
          </CardTitle>
          <CardDescription>Test different toast notification types</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <Button 
            class="w-full bg-red-500 hover:bg-red-600" 
            on:click={testError}
          >
            Test Error Toast
          </Button>
          
          <Button 
            class="w-full bg-green-500 hover:bg-green-600" 
            on:click={testSuccess}
          >
            Test Success Toast
          </Button>
          
          <Button 
            class="w-full bg-yellow-500 hover:bg-yellow-600" 
            on:click={testWarning}
          >
            Test Warning Toast
          </Button>
          
          <Button 
            class="w-full bg-blue-500 hover:bg-blue-600" 
            on:click={testInfo}
          >
            Test Info Toast
          </Button>
        </CardContent>
      </Card>

      <!-- Authorization Tests -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Shield class="h-5 w-5 text-purple-600" />
            Authorization & Role Guards
          </CardTitle>
          <CardDescription>Test unauthorized access scenarios and role-based redirects</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 class="font-semibold text-yellow-800 mb-2">How to test:</h4>
            <ol class="list-decimal list-inside text-sm text-yellow-700 space-y-1">
              <li>Login as a customer user</li>
              <li>Click one of the restricted URLs below</li>
              <li>You should be redirected to /customer with a flash message</li>
              <li>The URL should be clean (no ?message= parameters)</li>
            </ol>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="space-y-3">
              <Badge variant="destructive" class="w-full justify-center">Admin Only</Badge>
              <Button asChild variant="outline" class="w-full">
                <a href="/admin-only" class="text-red-700 hover:text-red-800">
                  Admin-Only Page
                </a>
              </Button>
            </div>
            
            <div class="space-y-3">
              <Badge variant="secondary" class="w-full justify-center">Manager/Admin</Badge>
              <Button asChild variant="outline" class="w-full">
                <a href="/app" class="text-blue-700 hover:text-blue-800">
                  App Dashboard
                </a>
              </Button>
            </div>
            
            <div class="space-y-3">
              <Badge class="w-full justify-center bg-green-100 text-green-800">Staff Only</Badge>
              <Button asChild variant="outline" class="w-full">
                <a href="/staff" class="text-green-700 hover:text-green-800">
                  Staff Area
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Test Results Section -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <AlertCircle class="h-5 w-5 text-amber-600" />
          Test Results & Debug Info
        </CardTitle>
        <CardDescription>Check browser console for detailed test logs</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="p-4 bg-gray-100 rounded-lg">
          <p class="text-sm text-gray-700 mb-2">
            <strong>Expected Behaviors:</strong>
          </p>
          <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Flash messages should appear as toast notifications</li>
            <li>Toast notifications should be styled correctly with colors</li>
            <li>Unauthorized access should redirect with appropriate messages</li>
            <li>No URL parameters should remain after flash message delivery</li>
            <li>All redirects should maintain clean URLs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
