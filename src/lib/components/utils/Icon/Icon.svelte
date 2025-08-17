<script lang="ts">
	import type { Component } from 'svelte';
	import * as lucide from '@lucide/svelte';
	
	export let name: keyof typeof lucide;
	export let size: number = 24;
	export let className: string = '';
	
	$: icon = lucide[name] as Component;
</script>

<svelte:component this={icon} {size} class={className} />
