import { defineConfig } from 'vitest/config';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig({
	plugins: [
		vueJsx({
			include: [/\.[jt]sx$/, /\.vue$/],
		}),
	],
	test: {
		environment: 'jsdom',
		globals: true,
		coverage: {
			provider: 'v8',
		},
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		alias: {
			packages: path.resolve(__dirname, './packages'),
		},
	},
});
