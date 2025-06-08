
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Contact - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-bold text-gray-900">Contact Support</h1>

  <div class="grid md:grid-cols-2 gap-6">
    <!-- Contact Form -->
    <div class="bg-white rounded-lg border p-6">
      <h2 class="text-lg font-semibold mb-4">Send us a message</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
        </div>
        <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Send Message
        </button>
      </form>
    </div>

    <!-- Contact Info -->
    <div class="space-y-4">
      <div class="bg-white rounded-lg border p-6">
        <h3 class="font-semibold mb-3">Get in touch</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm">support@company.com</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span class="text-sm">+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
