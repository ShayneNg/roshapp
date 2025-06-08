
<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, Clock, Star, Gift, Users, Settings, MapPin, Phone, Mail, CreditCard } from 'lucide-svelte';

  // Get customer data from page store
  $: customerData = $page.data?.customerData;
  $: user = $page.data?.user;

  // Mock data for this specific customer
  const customerBookings = [
    {
      id: 1,
      service: 'Gel Manicure',
      date: '2024-01-25',
      time: '2:00 PM',
      staff: 'Sarah Johnson',
      status: 'confirmed',
      amount: 45.00
    },
    {
      id: 2,
      service: 'Pedicure Deluxe',
      date: '2024-02-01',
      time: '10:30 AM',
      staff: 'Maria Garcia',
      status: 'completed',
      amount: 65.00
    },
    {
      id: 3,
      service: 'Nail Art Premium',
      date: '2024-01-15',
      time: '3:30 PM',
      staff: 'Sarah Johnson',
      status: 'completed',
      amount: 85.00
    }
  ];

  const totalSpent = customerBookings.reduce((sum, booking) => sum + booking.amount, 0);
</script>

<div class="space-y-6">
  <!-- Customer Profile Header -->
  <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {customerData?.name?.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {customerData?.name || 'Customer Profile'}
            </h1>
            <p class="text-gray-600">Customer ID: {customerData?.id}</p>
            <Badge variant="secondary" class="mt-1">
              {customerData?.membershipLevel} Member
            </Badge>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center gap-2 text-gray-600">
            <Mail class="h-4 w-4" />
            <span>{customerData?.email}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <Calendar class="h-4 w-4" />
            <span>Member since {customerData?.memberSince}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <Star class="h-4 w-4" />
            <span>{customerData?.loyaltyPoints} Points</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Customer Stats -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Bookings</CardTitle>
        <Calendar class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-blue-600">{customerBookings.length}</div>
        <p class="text-xs text-muted-foreground">All time</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Spent</CardTitle>
        <CreditCard class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</div>
        <p class="text-xs text-muted-foreground">Lifetime value</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Loyalty Points</CardTitle>
        <Gift class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-purple-600">{customerData?.loyaltyPoints}</div>
        <p class="text-xs text-muted-foreground">Available to redeem</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Last Visit</CardTitle>
        <Clock class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-orange-600">5</div>
        <p class="text-xs text-muted-foreground">Days ago</p>
      </CardContent>
    </Card>
  </div>

  <!-- Booking History -->
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="flex items-center gap-2">
            <Calendar class="h-5 w-5 text-purple-500" />
            Booking History
          </CardTitle>
          <CardDescription>Complete service history for this customer</CardDescription>
        </div>
        <Button size="sm" href="/customer/booking/new" class="bg-purple-500 hover:bg-purple-600">
          New Booking
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each customerBookings as booking}
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div class="space-y-1 flex-1">
              <div class="flex items-center gap-4">
                <p class="font-medium">{booking.service}</p>
                <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'completed' ? 'secondary' : 'outline'}>
                  {booking.status}
                </Badge>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Calendar class="h-3 w-3" />
                  {booking.date}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="h-3 w-3" />
                  {booking.time}
                </span>
                <span>with {booking.staff}</span>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-lg">${booking.amount.toFixed(2)}</p>
              <p class="text-sm text-gray-500">Booking #{booking.id}</p>
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>

  <!-- Customer Preferences & Notes -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customer service preferences and notes</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-700">Preferred Services</p>
          <div class="flex gap-2 flex-wrap">
            <Badge variant="outline">Gel Manicure</Badge>
            <Badge variant="outline">Pedicure</Badge>
            <Badge variant="outline">Nail Art</Badge>
          </div>
        </div>
        
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-700">Preferred Staff</p>
          <div class="flex gap-2 flex-wrap">
            <Badge variant="outline">Sarah Johnson</Badge>
            <Badge variant="outline">Maria Garcia</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-700">Notes</p>
          <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
            Prefers morning appointments. Allergic to certain nail products - always check before service.
          </p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage this customer's account</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <Button href="/customer/{customerData?.name}/booking" variant="outline" class="w-full justify-start h-12">
          <Calendar class="h-4 w-4 mr-2" />
          Schedule New Appointment
        </Button>
        
        <Button href="/customer/{customerData?.name}/edit" variant="outline" class="w-full justify-start h-12">
          <Settings class="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        
        <Button href="/customer/{customerData?.name}/loyalty" variant="outline" class="w-full justify-start h-12">
          <Gift class="h-4 w-4 mr-2" />
          Manage Loyalty Points
        </Button>
        
        <Button href="/customer" variant="outline" class="w-full justify-start h-12">
          <Users class="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </CardContent>
    </Card>
  </div>
</div>
