import { computed, getCurrentInstance, provide } from 'vue';
import type { App } from 'vue';
import './theme-chalk/index.scss';
export * from './hooks';
export * from './components';
export * from './utils/theme';
import * as components from './components';
import directives from './utils/directive';
import { configProviderContextKey } from './hooks/global-config';
import type { ConfigProviderOptions } from './hooks/global-config';

export const version = __version__;
export const install = function (app: App, options?: ConfigProviderOptions) {
	Object.keys(components).forEach(key => {
		const component = components[key];
		app.component(component.name, component);
	});
	directives(app);
	if (options) {
		const inSetup = !!getCurrentInstance();
		const provideFn = app?.provide ?? (inSetup ? provide : undefined);
		provideFn(
			configProviderContextKey,
			computed(() => options)
		);
	}
};
export default {
	version,
	install,
};
