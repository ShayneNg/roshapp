<script lang="ts">
	import '../app.css';

 	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
	<ModeWatcher />
</div>