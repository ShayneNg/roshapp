<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Calendar, Clock, MapPin, Phone, Eye, Edit, X } from 'lucide-svelte';

  const upcomingBookings = [
    {
      id: 1,
      service: 'Gel Manicure',
      date: '2024-01-25',
      time: '2:00 PM',
      staff: 'Sarah Johnson',
      status: 'confirmed',
      price: 35,
      location: 'Main Location',
      canReschedule: true,
      canCancel: true
    },
    {
      id: 2,
      service: 'Spa Pedicure',
      date: '2024-02-01',
      time: '10:30 AM',
      staff: 'Maria Garcia',
      status: 'pending',
      price: 45,
      location: 'Downtown Branch',
      canReschedule: true,
      canCancel: true
    }
  ];

  const pastBookings = [
    {
      id: 3,
      service: 'Classic Manicure',
      date: '2024-01-10',
      time: '3:00 PM',
      staff: 'Jessica Lee',
      status: 'completed',
      price: 25,
      location: 'Main Location',
      rating: 5,
      canReview: false,
      canRebook: true
    },
    {
      id: 4,
      service: 'French Manicure',
      date: '2023-12-20',
      time: '1:00 PM',
      staff: 'Sarah Johnson',
      status: 'completed',
      price: 30,
      location: 'Main Location',
      rating: 4,
      canReview: false,
      canRebook: true
    }
  ];

  function getStatusColor(status: string) {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function handleReschedule(bookingId: number) {
    console.log('Reschedule booking:', bookingId);
    // Implement reschedule logic
  }

  function handleCancel(bookingId: number) {
    console.log('Cancel booking:', bookingId);
    // Implement cancel logic
  }

  function handleRebook(bookingId: number) {
    console.log('Rebook service:', bookingId);
    // Implement rebook logic
  }
</script>

<svelte:head>
  <title>My Bookings - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">My Bookings</h1>
      <p class="text-gray-600 mt-2">Manage your appointments and booking history</p>
    </div>
    <Button href="/customer/booking/new" class="bg-pink-500 hover:bg-pink-600">
      <Calendar class="h-4 w-4 mr-2" />
      New Booking
    </Button>
  </div>

  <!-- Booking Tabs -->
  <Tabs defaultValue="upcoming" class="space-y-6">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
      <TabsTrigger value="history">History ({pastBookings.length})</TabsTrigger>
    </TabsList>

    <!-- Upcoming Bookings -->
    <TabsContent value="upcoming" class="space-y-4">
      {#if upcomingBookings.length > 0}
        {#each upcomingBookings as booking (booking.id)}
          <Card>
            <CardHeader>
              <div class="flex items-start justify-between">
                <div>
                  <CardTitle class="text-xl">{booking.service}</CardTitle>
                  <CardDescription class="mt-1">
                    Appointment #{booking.id.toString().padStart(4, '0')}
                  </CardDescription>
                </div>
                <Badge class={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="flex items-center gap-3 text-sm">
                    <Calendar class="h-4 w-4 text-pink-500" />
                    <span class="font-medium">{booking.date}</span>
                  </div>

                  <div class="flex items-center gap-3 text-sm">
                    <Clock class="h-4 w-4 text-blue-500" />
                    <span class="font-medium">{booking.time}</span>
                  </div>

                  <div class="flex items-center gap-3 text-sm">
                    <MapPin class="h-4 w-4 text-green-500" />
                    <span class="font-medium">{booking.location}</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center gap-3 text-sm">
                    <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span class="text-purple-600 font-medium text-xs">
                        {booking.staff.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span class="font-medium">{booking.staff}</span>
                  </div>

                  <div class="text-sm">
                    <span class="text-gray-600">Price: </span>
                    <span class="font-bold text-green-600">${booking.price}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-4 border-t">
                <Button size="sm" variant="outline" href="/customer/booking/{booking.id}">
                  <Eye class="h-4 w-4 mr-2" />
                  View Details
                </Button>

                {#if booking.canReschedule}
                  <Button 
                    size="sm" 
                    variant="outline"
                    on:click={() => handleReschedule(booking.id)}
                  >
                    <Edit class="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                {/if}

                <Button size="sm" variant="outline" href="tel:+1234567890">
                  <Phone class="h-4 w-4 mr-2" />
                  Call Salon
                </Button>

                {#if booking.canCancel}
                  <Button 
                    size="sm" 
                    variant="outline"
                    class="text-red-600 hover:text-red-700"
                    on:click={() => handleCancel(booking.id)}
                  >
                    <X class="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                {/if}
              </div>
            </CardContent>
          </Card>
        {/each}
      {:else}
        <div class="text-center py-12">
          <Calendar class="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
          <p class="text-gray-600 mb-4">Ready to book your next nail service?</p>
          <Button href="/customer/booking/new" class="bg-pink-500 hover:bg-pink-600">
            Book Your First Appointment
          </Button>
        </div>
      {/if}
    </TabsContent>

    <!-- Booking History -->
    <TabsContent value="history" class="space-y-4">
      {#if pastBookings.length > 0}
        {#each pastBookings as booking (booking.id)}
          <Card>
            <CardHeader>
              <div class="flex items-start justify-between">
                <div>
                  <CardTitle class="text-xl">{booking.service}</CardTitle>
                  <CardDescription class="mt-1">
                    {booking.date} at {booking.time} • {booking.staff}
                  </CardDescription>
                </div>
                <div class="text-right">
                  <Badge class={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                  {#if booking.rating}
                    <div class="flex items-center gap-1 mt-2">
                      {#each Array(5) as _, i}
                        <span class="text-yellow-400">
                          {i < booking.rating ? '★' : '☆'}
                        </span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <span class="text-gray-600">Total paid: </span>
                  <span class="font-bold text-green-600">${booking.price}</span>
                </div>

                <div class="flex gap-2">
                  {#if booking.canRebook}
                    <Button 
                      size="sm" 
                      variant="outline"
                      on:click={() => handleRebook(booking.id)}
                    >
                      Book Again
                    </Button>
                  {/if}

                  <Button size="sm" variant="outline" href="/customer/booking/{booking.id}">
                    View Receipt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        {/each}
      {:else}
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📋</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No booking history</h3>
          <p class="text-gray-600">Your completed appointments will appear here</p>
        </div>
      {/if}
    </TabsContent>
  </Tabs>
</div>