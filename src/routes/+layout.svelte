<!-- src/routes/+layout.svelte -->
<script lang="ts" context="module">
	/**
	 * root layout load function
	 * place to fetch session info & redirect if needed
	 */
	import type { LayoutLoad } from './$types';

	export const load: LayoutLoad = async ({ parent }) => {
	// Compose session from parent (hook or root)
	const { session } = await parent();

	return { session };
	};
</script>

<script lang="ts">
	export let data: { session: any };
</script>

<body
	class="bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen"
>
	{#if data.session?.user}
	<slot />  <!-- User logged in, proceed -->
	{:else}
	<slot name="login" />  <!-- Restrict content, show login slot or blank -->
	{/if}
</body>

<style>
	/* Global body styles can go here if needed */
</style>
