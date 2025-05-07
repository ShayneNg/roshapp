
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss({
			config: './tailwind.config.js',
		}), 
		sveltekit()
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
		hmr: {
			clientPort: 443
		},
		allowedHosts: [
			'76a1670c-5492-42e2-9c04-6e9a33221cbf-00-3fxqozxlirspt.picard.replit.dev'
		]
	}
});
