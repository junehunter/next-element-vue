import { inject, isRef } from 'vue';

export interface ConfigProviderOptions {
	theme?: 'light' | 'dark';
	locale?: string;
	size?: 'large' | 'default' | 'small';
}
export const defaultConfigProviderOptions: ConfigProviderOptions = {
	theme: 'light',
	locale: 'zh-CN',
	size: 'default',
};
export const configProviderContextKey = Symbol('configProviderContextKey');
export const getConfigProviderContext = () => {
	const configProvider = inject(configProviderContextKey, defaultConfigProviderOptions);
	const config = isRef(configProvider) ? configProvider.value : configProvider;
	return Object.assign({}, defaultConfigProviderOptions, config);
};
