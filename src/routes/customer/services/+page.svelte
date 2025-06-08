
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Star, Clock, DollarSign, Search } from 'lucide-svelte';

  let searchQuery = '';
  let selectedCategory = 'all';

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'manicure', name: 'Manicure' },
    { id: 'pedicure', name: 'Pedicure' },
    { id: 'nail-art', name: 'Nail Art' },
    { id: 'treatments', name: 'Treatments' }
  ];

  const services = [
    {
      id: 1,
      name: 'Classic Manicure',
      description: 'Traditional nail care with shape, buff, and polish',
      category: 'manicure',
      price: 25,
      duration: 45,
      rating: 4.8,
      image: '/images/classic-manicure.jpg',
      popular: true
    },
    {
      id: 2,
      name: 'Gel Manicure',
      description: 'Long-lasting gel polish that stays chip-free for weeks',
      category: 'manicure',
      price: 35,
      duration: 60,
      rating: 4.9,
      image: '/images/gel-manicure.jpg',
      popular: true
    },
    {
      id: 3,
      name: 'Spa Pedicure',
      description: 'Relaxing foot treatment with exfoliation and massage',
      category: 'pedicure',
      price: 45,
      duration: 75,
      rating: 4.7,
      image: '/images/spa-pedicure.jpg',
      popular: false
    },
    {
      id: 4,
      name: 'French Manicure',
      description: 'Classic white tip design for a timeless elegant look',
      category: 'manicure',
      price: 30,
      duration: 50,
      rating: 4.6,
      image: '/images/french-manicure.jpg',
      popular: false
    },
    {
      id: 5,
      name: 'Nail Art Design',
      description: 'Custom artistic designs and patterns on your nails',
      category: 'nail-art',
      price: 50,
      duration: 90,
      rating: 4.9,
      image: '/images/nail-art.jpg',
      popular: true
    },
    {
      id: 6,
      name: 'Cuticle Treatment',
      description: 'Professional cuticle care and nail strengthening',
      category: 'treatments',
      price: 20,
      duration: 30,
      rating: 4.5,
      image: '/images/cuticle-treatment.jpg',
      popular: false
    }
  ];

  $: filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Our Services</h1>
    <p class="text-gray-600 mt-2">Discover our premium nail care treatments</p>
  </div>

  <!-- Search and Filters -->
  <div class="flex flex-col md:flex-row gap-4">
    <div class="relative flex-1">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search services..."
        bind:value={searchQuery}
        class="pl-10"
      />
    </div>
    
    <div class="flex gap-2 overflow-x-auto pb-2">
      {#each categories as category}
        <Button
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          class="whitespace-nowrap"
          on:click={() => selectedCategory = category.id}
        >
          {category.name}
        </Button>
      {/each}
    </div>
  </div>

  <!-- Services Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredServices as service (service.id)}
      <Card class="h-full hover:shadow-lg transition-shadow">
        <div class="relative">
          <div class="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-t-lg flex items-center justify-center">
            <div class="text-4xl">💅</div>
          </div>
          {#if service.popular}
            <Badge class="absolute top-2 right-2 bg-pink-500">Popular</Badge>
          {/if}
        </div>
        
        <CardHeader>
          <div class="flex items-start justify-between">
            <div>
              <CardTitle class="text-lg">{service.name}</CardTitle>
              <CardDescription class="mt-1">{service.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-1 text-yellow-600">
              <Star class="h-4 w-4 fill-current" />
              <span class="font-medium">{service.rating}</span>
            </div>
            
            <div class="flex items-center gap-1 text-gray-600">
              <Clock class="h-4 w-4" />
              <span>{service.duration} min</span>
            </div>
            
            <div class="flex items-center gap-1 text-green-600 font-bold">
              <DollarSign class="h-4 w-4" />
              <span>{service.price}</span>
            </div>
          </div>

          <Button href="/customer/booking/new?service={service.id}" class="w-full bg-pink-500 hover:bg-pink-600">
            Book Now
          </Button>
        </CardContent>
      </Card>
    {/each}
  </div>

  {#if filteredServices.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No services found</h3>
      <p class="text-gray-600">Try adjusting your search or filter criteria</p>
      <Button 
        variant="outline" 
        class="mt-4"
        on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}
      >
        Clear Filters
      </Button>
    </div>
  {/if}
</div>
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  
  export let data;

  const services = [
    { name: 'Hair Cut', price: '$35', duration: '45 min', icon: 'Scissors' },
    { name: 'Hair Color', price: '$75', duration: '2 hours', icon: 'Palette' },
    { name: 'Styling', price: '$25', duration: '30 min', icon: 'Sparkles' },
    { name: 'Beard Trim', price: '$20', duration: '20 min', icon: 'User' }
  ];
</script>

<svelte:head>
  <title>Services - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-foreground">Available Services</h1>
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
      <Icon name="Plus" size={16} class="mr-2" />
      Book Service
    </button>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    {#each services as service}
      <div class="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={service.icon} size={24} class="text-primary" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-foreground">{service.name}</h3>
            <p class="text-sm text-muted-foreground mt-1">{service.duration}</p>
            <p class="text-lg font-bold text-primary mt-2">{service.price}</p>
          </div>
          <button class="text-primary hover:text-primary/80 transition-colors">
            <Icon name="ArrowRight" size={20} />
          </button>
        </div>
      </div>
    {/each}
  </div>

  <!-- Service History -->
  <div class="space-y-4">
    <h2 class="text-lg font-semibold text-foreground">Recent Services</h2>
    <div class="space-y-3">
      <div class="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <div class="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={20} class="text-success" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-foreground">Hair Cut</p>
          <p class="text-sm text-muted-foreground">Completed on Jan 10, 2024</p>
        </div>
        <p class="text-foreground font-semibold">$35</p>
      </div>
      
      <div class="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <div class="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={20} class="text-success" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-foreground">Hair Color</p>
          <p class="text-sm text-muted-foreground">Completed on Dec 20, 2023</p>
        </div>
        <p class="text-foreground font-semibold">$75</p>
      </div>
    </div>
  </div>
</div>
