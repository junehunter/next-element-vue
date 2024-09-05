import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createRouter, createMemoryHistory } from 'vue-router';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { globals } from '../vitepress';
import '../vitepress/styles/index.scss';
// 引用组件源码，提升编译速度（使用vite直接编译比rollup编译速度快很多）
// import NextElement from 'packages/index';
// import NextElement from '../../../dist/index.js';
// import '../../../dist/index.css';

export default {
	...DefaultTheme,
	// Layout: Layout,
	enhanceApp: async ({ app }) => {
		const router = createRouter({
			history: createMemoryHistory(),
			routes: [],
		});
		app.use(router);
		app.use(ElementPlus, {
			locale: zhCn,
		});
		const NextElement = await dynamicLoadNextElement();
		app.use(NextElement);
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component);
		}
		globals.forEach(([name, Comp]) => {
			app.component(name, Comp);
		});
	},
};

const dynamicLoadNextElement = async () => {
	let NextElement: any = null;
	if (import.meta.env.DEV) {
		// 开发环境
		NextElement = await import('packages/index');
	} else {
		// 生产环境
		import('../../../publish/dist/index.css');
		NextElement = await import('../../../publish/dist/index.js');
	}
	return NextElement;
};
