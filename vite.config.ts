import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],

	// Optimize SVG loading
	assetsInclude: ['**/*.svg'],

	build: {
	rollupOptions: {
		output: {
		assetFileNames: (assetInfo) => {
			// Cache SVG assets with longer expiration
			if (assetInfo.name.endsWith('.svg')) {
			return 'assets/svg/[name]-[hash][extname]';
			}
			return 'assets/[name]-[hash][extname]';
		}
		}
	}
	},
	optimizeDeps: {
		include: ['@lucide/svelte']
	}
});
