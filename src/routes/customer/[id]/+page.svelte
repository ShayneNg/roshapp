<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, Clock, Star, Gift, Users, Settings, MapPin, Phone, Mail, CreditCard } from 'lucide-svelte';
  import Icon from '$lib/components/icons/Icon.svelte';

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

<svelte:head>
  <title>Customer Dashboard - {customerData?.name || 'Customer'}</title>
</svelte:head>

<div class="space-y-6">
  <!-- Customer Profile Header -->
  <div class="bg-base-200 p-6 rounded-lg border border-base-300">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center text-white font-bold text-xl">
            {customerData?.name?.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-foreground">
              {customerData?.name || 'Customer Profile'}
            </h1>
            <p class="text-muted-foreground">Customer ID: {customerData?.id}</p>
            <Badge variant="secondary" class="mt-1">
              {customerData?.membershipLevel} Member
            </Badge>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="Mail" size={16} />
            <span>{customerData?.email}</span>
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Member since {customerData?.memberSince}</span>
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="Star" size={16} />
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
        <Icon name="Calendar" size={16} class="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-blue-600">{customerBookings.length}</div>
        <p class="text-xs text-muted-foreground">All time</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Spent</CardTitle>
        <Icon name="CreditCard" size={16} class="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</div>
        <p class="text-xs text-muted-foreground">Lifetime value</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Loyalty Points</CardTitle>
        <Icon name="Gift" size={16} class="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-purple-600">{customerData?.loyaltyPoints}</div>
        <p class="text-xs text-muted-foreground">Available to redeem</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Last Visit</CardTitle>
        <Icon name="Clock" size={16} class="text-muted-foreground" />
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
            <Icon name="Calendar" size={20} class="text-primary" />
            Booking History
          </CardTitle>
          <CardDescription>Complete service history for this customer</CardDescription>
        </div>
        <Button size="sm" href="../booking" class="bg-primary hover:bg-primary-focus">
          New Booking
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each customerBookings as booking}
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-base-100 transition-colors">
            <div class="space-y-1 flex-1">
              <div class="flex items-center gap-4">
                <p class="font-medium">{booking.service}</p>
                <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'completed' ? 'secondary' : 'outline'}>
                  {booking.status}
                </Badge>
              </div>
              <div class="flex items-center gap-6 text-sm text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  {booking.date}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {booking.time}
                </span>
                <span>with {booking.staff}</span>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-lg">${booking.amount.toFixed(2)}</p>
              <p class="text-sm text-muted-foreground">Booking #{booking.id}</p>
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
          <p class="text-sm font-medium text-foreground">Preferred Services</p>
          <div class="flex gap-2 flex-wrap">
            <Badge variant="outline">Gel Manicure</Badge>
            <Badge variant="outline">Pedicure</Badge>
            <Badge variant="outline">Nail Art</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-foreground">Preferred Staff</p>
          <div class="flex gap-2 flex-wrap">
            <Badge variant="outline">Sarah Johnson</Badge>
            <Badge variant="outline">Maria Garcia</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-foreground">Notes</p>
          <p class="text-sm text-muted-foreground bg-base-100 p-3 rounded">
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
        <Button href="../booking" variant="outline" class="w-full justify-start h-12">
          <Icon name="Calendar" size={16} class="mr-2" />
          Schedule New Appointment
        </Button>

        <Button href="../edit" variant="outline" class="w-full justify-start h-12">
          <Icon name="Settings" size={16} class="mr-2" />
          Edit Profile
        </Button>

        <Button href="../loyalty" variant="outline" class="w-full justify-start h-12">
          <Icon name="Gift" size={16} class="mr-2" />
          Manage Loyalty Points
        </Button>

        <Button href=".." variant="outline" class="w-full justify-start h-12">
          <Icon name="Users" size={16} class="mr-2" />
          Back to Dashboard
        </Button>
      </CardContent>
    </Card>
  </div>
</div>