import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { MarkdownTransform } from './.vitepress/plugins/markdown-transform';
import path from 'path';
import fs from 'fs';
const pathResolve = (dir: string): any => {
	return path.resolve(__dirname, '.', dir);
};
const pkg = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
const version = pkg.version;
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
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api'],
			},
		},
	},
	resolve: {
		alias: {
			packages: pathResolve('../packages'), // 引用组件源码，设置路径别名
			'next-element-vue': pathResolve('../packages'),
		},
	},
	server: {
		host: true,
		strictPort: true,
		port: 3006, // 设置 VitePress 的启动端口
	},
	define: {
		__version__: JSON.stringify(version),
	},
});
