
<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Calendar, Clock, Star, Gift, Users, Settings } from 'lucide-svelte';

  // Get user data from page store
  $: user = $page.data?.user;

  // Mock data for demonstration
  const upcomingBookings = [
    {
      id: 1,
      service: 'Gel Manicure',
      date: '2024-01-25',
      time: '2:00 PM',
      staff: 'Sarah Johnson',
      status: 'confirmed'
    },
    {
      id: 2,
      service: 'Pedicure Deluxe',
      date: '2024-02-01',
      time: '10:30 AM',
      staff: 'Maria Garcia',
      status: 'pending'
    }
  ];

  const loyaltyPoints = 450;
  const nextReward = 500;
  const recentBookings = 8;
</script>

<div class="space-y-6">
  <!-- Welcome Header with Illustration -->
  <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'Valued Customer'}! 💅
        </h1>
        <p class="text-gray-600">Ready for your next nail appointment?</p>
      </div>
      <div class="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
        <div class="w-40 h-30 md:w-32 md:h-24 mx-auto md:mx-0">
          <img 
            src="/images/welcome-back.svg" 
            alt="Welcome back illustration" 
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Stats Cards -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Loyalty Points</CardTitle>
        <Gift class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-pink-600">{loyaltyPoints}</div>
        <p class="text-xs text-muted-foreground">
          {nextReward - loyaltyPoints} points to next reward
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Bookings</CardTitle>
        <Calendar class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-blue-600">{recentBookings}</div>
        <p class="text-xs text-muted-foreground">This year</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Member Since</CardTitle>
        <Star class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-purple-600">2024</div>
        <p class="text-xs text-muted-foreground">Valued customer</p>
      </CardContent>
    </Card>
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Upcoming Appointments -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle class="flex items-center gap-2">
              <Calendar class="h-5 w-5 text-pink-500" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled nail services</CardDescription>
          </div>
          <Button size="sm" href="/customer/booking/new" class="bg-pink-500 hover:bg-pink-600">
            Book Now
          </Button>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        {#each upcomingBookings as booking}
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div class="space-y-1">
              <p class="font-medium">{booking.service}</p>
              <div class="flex items-center gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Calendar class="h-3 w-3" />
                  {booking.date}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="h-3 w-3" />
                  {booking.time}
                </span>
              </div>
              <p class="text-sm text-gray-500">with {booking.staff}</p>
            </div>
            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
              {booking.status}
            </Badge>
          </div>
        {/each}

        {#if upcomingBookings.length === 0}
          <div class="text-center py-8 text-gray-500">
            <div class="w-48 h-36 mx-auto mb-4">
              <img 
                src="/images/empty-state.svg" 
                alt="No appointments illustration" 
                class="w-full h-full object-contain"
              />
            </div>
            <p class="text-lg font-medium text-gray-600 mb-2">No upcoming appointments</p>
            <p class="text-sm text-gray-500 mb-4">Book your first nail service and start your beauty journey</p>
            <Button href="/customer/booking/new" class="bg-pink-500 hover:bg-pink-600">
              Schedule Your First Appointment
            </Button>
          </div>
        {/if}
      </CardContent>
    </Card>

    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Everything you need at your fingertips</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <Button href="/customer/services" variant="outline" class="w-full justify-start h-12">
          <Gift class="h-4 w-4 mr-2" />
          Browse Services
        </Button>
        
        <Button href="/customer/booking" variant="outline" class="w-full justify-start h-12">
          <Calendar class="h-4 w-4 mr-2" />
          Manage Bookings
        </Button>
        
        <Button href="/customer/profile" variant="outline" class="w-full justify-start h-12">
          <Settings class="h-4 w-4 mr-2" />
          Profile Settings
        </Button>
        
        <Button href="/customer/loyalty" variant="outline" class="w-full justify-start h-12">
          <Star class="h-4 w-4 mr-2" />
          Loyalty Program
        </Button>

        <Button href="/customer/referral" variant="outline" class="w-full justify-start h-12">
          <Users class="h-4 w-4 mr-2" />
          Refer Friends
        </Button>
      </CardContent>
    </Card>
  </div>

  <!-- Recent Activity & Promotions -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Current Promotions -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Gift class="h-5 w-5 text-green-500" />
          Current Promotions
        </CardTitle>
        <CardDescription>Special offers just for you</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-green-800">20% Off Gel Manicure</h4>
              <p class="text-sm text-green-600">Valid until Feb 28, 2024</p>
            </div>
            <Badge class="bg-green-100 text-green-800">NEW</Badge>
          </div>
        </div>
        
        <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-purple-800">Free Add-on Service</h4>
              <p class="text-sm text-purple-600">With any pedicure booking</p>
            </div>
            <Badge class="bg-purple-100 text-purple-800">LIMITED</Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Account Overview -->
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Your profile information</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <p class="text-sm text-gray-600">Email</p>
          <p class="font-medium">{user?.email || 'Not provided'}</p>
        </div>
        
        <div class="space-y-2">
          <p class="text-sm text-gray-600">Member Level</p>
          <Badge variant="secondary">
            {loyaltyPoints >= 1000 ? 'Gold' : loyaltyPoints >= 500 ? 'Silver' : 'Bronze'} Member
          </Badge>
        </div>
        
        <div class="space-y-2">
          <p class="text-sm text-gray-600">Preferred Services</p>
          <div class="flex gap-2 flex-wrap">
            <Badge variant="outline">Gel Manicure</Badge>
            <Badge variant="outline">Pedicure</Badge>
          </div>
        </div>

        <Button href="/customer/profile" variant="outline" class="w-full">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  </div>
</div>
