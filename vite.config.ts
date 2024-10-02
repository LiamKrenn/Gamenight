import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ['util'],
			protocolImports: true
		})
	],
	server: {
		fs: {
			allow: ['/static/SourceSans3-VariableFont_wght.ttf']
		}
	}
});
