
<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Switch } from '$lib/components/ui/switch';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Badge } from '$lib/components/ui/badge';
  import { User, Bell, Shield, Gift, Phone, Mail, MapPin, Calendar } from 'lucide-svelte';

  $: user = $page.data?.user;

  // Profile form data
  let profileData = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    allergies: '',
    preferences: ''
  };

  // Notification preferences
  let notifications = {
    appointmentReminders: true,
    promotionalEmails: true,
    smsReminders: false,
    loyaltyUpdates: true,
    specialOffers: true
  };

  // Security settings
  let security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  function handleSaveProfile() {
    console.log('Saving profile:', profileData);
    // Implement save logic
  }

  function handleSaveNotifications() {
    console.log('Saving notifications:', notifications);
    // Implement save logic
  }

  function handleChangePassword() {
    console.log('Changing password');
    // Implement password change logic
  }

  function handleDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account');
      // Implement account deletion logic
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Profile Settings</h1>
    <p class="text-gray-600 mt-2">Manage your account information and preferences</p>
  </div>

  <!-- Profile Tabs -->
  <Tabs defaultValue="personal" class="space-y-6">
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger value="personal">Personal</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
      <TabsTrigger value="preferences">Preferences</TabsTrigger>
    </TabsList>

    <!-- Personal Information -->
    <TabsContent value="personal" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <User class="h-5 w-5 text-blue-500" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="firstName">First Name</Label>
              <Input id="firstName" bind:value={profileData.firstName} placeholder="John" />
            </div>
            <div class="space-y-2">
              <Label for="lastName">Last Name</Label>
              <Input id="lastName" bind:value={profileData.lastName} placeholder="Doe" />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="email">Email Address</Label>
            <Input id="email" value={user?.email || ''} disabled class="bg-gray-50" />
            <p class="text-xs text-gray-500">Email cannot be changed. Contact support if needed.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="phone">Phone Number</Label>
              <Input id="phone" bind:value={profileData.phone} placeholder="+1 (555) 123-4567" />
            </div>
            <div class="space-y-2">
              <Label for="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" bind:value={profileData.dateOfBirth} />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="address">Address</Label>
            <Input id="address" bind:value={profileData.address} placeholder="123 Main Street" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="city">City</Label>
              <Input id="city" bind:value={profileData.city} placeholder="New York" />
            </div>
            <div class="space-y-2">
              <Label for="zipCode">ZIP Code</Label>
              <Input id="zipCode" bind:value={profileData.zipCode} placeholder="10001" />
            </div>
          </div>

          <Button on:click={handleSaveProfile} class="bg-blue-500 hover:bg-blue-600">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <!-- Emergency Contact -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Phone class="h-5 w-5 text-green-500" />
            Emergency Contact
          </CardTitle>
          <CardDescription>Person to contact in case of emergency</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="emergencyContact">Contact Name</Label>
              <Input id="emergencyContact" bind:value={profileData.emergencyContact} placeholder="Jane Doe" />
            </div>
            <div class="space-y-2">
              <Label for="emergencyPhone">Contact Phone</Label>
              <Input id="emergencyPhone" bind:value={profileData.emergencyPhone} placeholder="+1 (555) 987-6543" />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Medical Information -->
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Help us provide the best service for your needs</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="allergies">Allergies & Sensitivities</Label>
            <Textarea 
              id="allergies" 
              bind:value={profileData.allergies} 
              placeholder="Please list any known allergies to nail products, chemicals, or other substances..."
              rows="3"
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Notification Settings -->
    <TabsContent value="notifications" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Bell class="h-5 w-5 text-yellow-500" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you'd like to receive updates from us</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-base">Appointment Reminders</Label>
                <p class="text-sm text-gray-500">Get notified about upcoming appointments</p>
              </div>
              <Switch bind:checked={notifications.appointmentReminders} />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-base">SMS Reminders</Label>
                <p class="text-sm text-gray-500">Receive text message reminders</p>
              </div>
              <Switch bind:checked={notifications.smsReminders} />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-base">Promotional Emails</Label>
                <p class="text-sm text-gray-500">Stay updated with our latest offers</p>
              </div>
              <Switch bind:checked={notifications.promotionalEmails} />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-base">Loyalty Updates</Label>
                <p class="text-sm text-gray-500">Get notified about points and rewards</p>
              </div>
              <Switch bind:checked={notifications.loyaltyUpdates} />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-base">Special Offers</Label>
                <p class="text-sm text-gray-500">Receive exclusive deals and discounts</p>
              </div>
              <Switch bind:checked={notifications.specialOffers} />
            </div>
          </div>

          <Button on:click={handleSaveNotifications} class="bg-yellow-500 hover:bg-yellow-600">
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Security Settings -->
    <TabsContent value="security" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Shield class="h-5 w-5 text-red-500" />
            Password & Security
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" bind:value={security.currentPassword} />
          </div>

          <div class="space-y-2">
            <Label for="newPassword">New Password</Label>
            <Input id="newPassword" type="password" bind:value={security.newPassword} />
          </div>

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" bind:value={security.confirmPassword} />
          </div>

          <Button on:click={handleChangePassword} class="bg-green-500 hover:bg-green-600">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <!-- Danger Zone -->
      <Card class="border-red-200">
        <CardHeader>
          <CardTitle class="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="p-4 border border-red-200 rounded-lg bg-red-50">
              <h4 class="font-medium text-red-800 mb-2">Delete Account</h4>
              <p class="text-sm text-red-600 mb-4">
                Once you delete your account, there is no going back. This will permanently delete your profile, booking history, and loyalty points.
              </p>
              <Button 
                variant="destructive" 
                on:click={handleDeleteAccount}
                class="bg-red-600 hover:bg-red-700"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Service Preferences -->
    <TabsContent value="preferences" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Gift class="h-5 w-5 text-purple-500" />
            Service Preferences
          </CardTitle>
          <CardDescription>Help us personalize your experience</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label>Preferred Services</Label>
            <div class="flex gap-2 flex-wrap">
              <Badge variant="outline" class="cursor-pointer hover:bg-pink-50">Gel Manicure</Badge>
              <Badge variant="outline" class="cursor-pointer hover:bg-pink-50">Classic Pedicure</Badge>
              <Badge variant="outline" class="cursor-pointer hover:bg-pink-50">Nail Art</Badge>
              <Badge variant="outline" class="cursor-pointer hover:bg-pink-50">French Manicure</Badge>
            </div>
          </div>

          <div class="space-y-2">
            <Label>Preferred Staff Members</Label>
            <div class="flex gap-2 flex-wrap">
              <Badge variant="outline" class="cursor-pointer hover:bg-blue-50">Sarah Johnson</Badge>
              <Badge variant="outline" class="cursor-pointer hover:bg-blue-50">Maria Garcia</Badge>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="preferences">Additional Notes</Label>
            <Textarea 
              id="preferences" 
              bind:value={profileData.preferences} 
              placeholder="Any special requests, preferred appointment times, or other preferences..."
              rows="3"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Loyalty Status -->
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Status</CardTitle>
          <CardDescription>Your membership details and benefits</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Current Status</p>
              <Badge class="mt-1">Silver Member</Badge>
            </div>
            <div class="text-right">
              <p class="font-medium">Points Balance</p>
              <p class="text-2xl font-bold text-purple-600">450</p>
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-medium">Progress to Gold Member</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-600 h-2 rounded-full" style="width: 45%"></div>
            </div>
            <p class="text-xs text-gray-500">550 more points needed for Gold status</p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>
<script lang="ts">
  import Icon from '$lib/components/icons/Icon.svelte';
  
  export let data;
</script>

<svelte:head>
  <title>Profile - Customer Portal</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-foreground">Profile Settings</h1>
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
      <Icon name="Save" size={16} class="mr-2" />
      Save Changes
    </button>
  </div>

  <div class="grid gap-6">
    <!-- Profile Information -->
    <div class="bg-card rounded-lg border border-border p-6">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Icon name="User" size={32} class="text-muted-foreground" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">{data.user?.username || 'Customer'}</h3>
          <p class="text-sm text-muted-foreground">Customer since 2023</p>
        </div>
        <button class="ml-auto text-sm text-primary hover:text-primary/80 transition-colors">
          Change Photo
        </button>
      </div>

      <form class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">First Name</label>
            <input type="text" value="John" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1">Last Name</label>
            <input type="text" value="Doe" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Email</label>
          <input type="email" value="john@example.com" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1">Phone</label>
          <input type="tel" value="+1 (555) 123-4567" class="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
        </div>
      </form>
    </div>

    <!-- Preferences -->
    <div class="bg-card rounded-lg border border-border p-6">
      <h3 class="text-lg font-semibold text-foreground mb-4">Preferences</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-foreground">Email Notifications</p>
            <p class="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
          </div>
          <button class="bg-primary w-11 h-6 rounded-full relative transition-colors">
            <span class="absolute left-1 top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform"></span>
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-foreground">SMS Notifications</p>
            <p class="text-sm text-muted-foreground">Receive appointment reminders via text</p>
          </div>
          <button class="bg-muted w-11 h-6 rounded-full relative transition-colors">
            <span class="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
