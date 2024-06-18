import type { App } from 'vue';
import './theme-chalk/index.scss';
export * from './hooks';
export * from './components';
import * as components from './components';
import directives from './utils/directive';

export const version = __version__;
export const install = function (app: App) {
	Object.keys(components).forEach(key => {
		const component = components[key];
		app.component(component.name, component);
	});
	directives(app);
};
export default {
	version,
	install,
};
