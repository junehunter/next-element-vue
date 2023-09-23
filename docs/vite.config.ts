import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform';

export default defineConfig({
	plugins: [
		VueMacros({
			setupComponent: false,
			setupSFC: false,
			plugins: {
				vueJsx: vueJsx(),
			},
		}),
		Components({
			dirs: ['.vitepress/vitepress/components'],
			allowOverrides: true,
			// custom resolvers
			resolvers: [
				// auto import icons
				// https://github.com/antfu/unplugin-icons
				IconsResolver(),
			],
			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		}),
		MarkdownTransform(),
	],
	server: {
		strictPort: true,
		port: 3006, // 设置 VitePress 的启动端口
	},
});
