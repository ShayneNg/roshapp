<script lang="ts">
	// import github from "$lib/images/github.svg";
  import Logo from '$lib/components/layout/Logo.svelte';
	import { Search, Bell, Server } from "lucide-svelte";

	import * as Avatar from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * * DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LightSwitch from "$lib/components/ui/light-switch/light-switch.svelte";
</script>

<header>
	<!-- Left: Logo + Mobile Nav Button -->
	<div class="corner">

		<!-- App Logo -->
			<Logo />
			<!-- <span class="font-bold text-xl">oshapp Inc.</span> -->

	</div>

	<!-- <Breadcrumb.Root class="corner hidden md:flex">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root> -->

	<!-- Right: Theme Toggle + User Menu -->
	<div class="corner">
		<!-- <form class="search-container">
			<Search class="text-muted-foreground absolute left-2.5 top-2.5 h-5 w-5"/>
			<Input
				type="search"
				placeholder="Search products..."
				class="bg-background w-md appearance-none px-8 mr-8 shadow-none md:w-2/3 lg:w-full"
			/>
		</form> -->


		<!-- Search Icon Button -->

		<!-- Search Link -->
        <a href="/" class="h-10 w-10 search-icon flex items-center justify-center transition-all duration-200 hover:border-2 hover:border-primary hover:rounded-md">
					<Search class="text-muted-foreground transition-all duration-200 hover:fill-current hover:text-primary hover:border-primary"/>
        </a>

		<!-- LightSwitch component to toggle between light and dark themes -->
		<LightSwitch />

		<!-- Server Dropdown Menu -->
		<DropdownMenu.Root>
			<!-- Trigger button to open the notification dropdown menu -->
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					size="icon"
					class="relative text-muted-foreground"
				>
					<!-- Notification icon for alerts and updates -->
					<Server class="h-5 w-5" />					
					<!-- Badge icon to indicate number of notifications -->
					<Badge
						variant="default"
						class="p-0 w-1.5 h-1.5 rounded-full absolute top-2.5 right-2 ring-2 ring-background"
					></Badge>
					<!-- Accessible text for screen readers -->
					<span class="sr-only">Toggle notification menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<!-- Content for the notification menu, aligned to the end of the trigger button -->
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Notifications</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- Notification items that list recent alerts -->
				<DropdownMenu.Item>You have new orders</DropdownMenu.Item>
				<DropdownMenu.Item>Server maintenance at 12 AM</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>No new notifications</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- Notification Dropdown Menu -->
		<DropdownMenu.Root>
			<!-- Trigger button to open the notification dropdown menu -->
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					size="icon"
					class="relative text-muted-foreground"
				>
					<!-- Notification icon for alerts and updates -->
					<Bell class="h-5 w-5" />
					<!-- Badge icon to indicate number of notifications -->
					<Badge 
						variant="destructive"
						class="p-0 w-1.5 h-1.5 rounded-full absolute top-2.5 right-3 ring-2 ring-background"
					></Badge>
					<!-- Accessible text for screen readers -->
					<span class="sr-only">Toggle notification menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<!-- Content for the notification menu, aligned to the end of the trigger button -->
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>Notifications</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- Notification items that list recent alerts -->
				<DropdownMenu.Item>You have new orders</DropdownMenu.Item>
				<DropdownMenu.Item>Server maintenance at 12 AM</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>No new notifications</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- User Interaction Dropdown Menu for account settings and logout options -->
		<DropdownMenu.Root>
			<!-- Trigger button to open the user dropdown menu -->
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="link"
					size="icon"
					class="text-muted-foreground"
				>
					<!-- User icon to represent account settings menu -->
					<Avatar.Root class="w-5 h-5">
					 <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					 <Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<!-- Screen reader text for opening user menu -->
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<!-- Content for the user menu, aligned to the end of the trigger button -->
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- Options within the user dropdown such as Settings and Support -->
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

<style lang="scss" scoped>
	header {
		@apply w-full h-14 sm:h-16 bg-header text-foreground px-4 flex items-center justify-between;

		.corner{
			@apply flex items-center gap-2;
		}
	}
</style>