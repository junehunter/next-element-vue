import { config } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import { createRouter, createMemoryHistory } from 'vue-router';
const router = createRouter({
	history: createMemoryHistory(),
	routes: [],
});
config.global.plugins.push(router);
config.global.plugins.push(ElementPlus);
